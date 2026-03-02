const {
    sequelize,
    Cart,
    CartItem,
    ProductVariant,
    Inventory,
    Order,
    OrderItem,
  } = require('../models');
  
  exports.checkout = async (userId) => {
    const transaction = await sequelize.transaction();
  
    try {
      const cart = await Cart.findOne({
        where: { user_id: userId },
        include: {
          model: CartItem,
          as: 'items',
          include: {
            model: ProductVariant,
            include: [Inventory],
          },
        },
        transaction,
      });
  
      if (!cart || cart.items.length === 0) {
        throw new Error('CART_EMPTY');
      }
  
      let totalAmount = 0;
  
      for (const item of cart.items) {
        const variant = item.product_variant;
        const stock = variant.inventory.quantity;
  
        if (stock < item.quantity) {
          throw new Error('INSUFFICIENT_STOCK');
        }
  
        totalAmount += item.quantity * parseFloat(variant.price);
      }
  
      const order = await Order.create(
        {
          user_id: userId,
          total_amount: totalAmount,
        },
        { transaction }
      );
  
      for (const item of cart.items) {
        const variant = item.product_variant;
  
        await OrderItem.create(
          {
            order_id: order.id,
            product_variant_id: variant.id,
            price: variant.price,
            quantity: item.quantity,
            subtotal: item.quantity * variant.price,
          },
          { transaction }
        );
  
        await Inventory.decrement(
          { quantity: item.quantity },
          {
            where: { product_variant_id: variant.id },
            transaction,
          }
        );
      }
  
      await CartItem.destroy({
        where: { cart_id: cart.id },
        transaction,
      });
  
      await transaction.commit();
      return order;
  
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };

  exports.getUserOrders = async (userId) => {
    return await Order.findAll({
      where: { user_id: userId },
      order: [['created_at', 'DESC']],
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [
            {
              model: ProductVariant,
              include: ['product'],
            },
          ],
        },
      ],
    });
  };
  
  exports.getOrderById = async (orderId, userId) => {
    return await Order.findOne({
      where: {
        id: orderId,
        user_id: userId,
      },
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [
            {
              model: ProductVariant,
              include: ['product'],
            },
          ],
        },
      ],
    });
  };

  exports.getVendorOrders = async (vendorId) => {
    return await Order.findAll(
        {
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [
            {
              model: ProductVariant,
              include: [
                {
                  model: Product,
                  where: { user_id: vendorId },
                },
              ],
            },
          ],
        },
      ],
      order: [['created_at', 'DESC']],
    }
);
  };

  exports.updateOrderStatus = async (orderId, newStatus, user) => {
    const order = await Order.findByPk(orderId);
  
    if (!order) {
      throw new Error('ORDER_NOT_FOUND');
    }
  
    const role = user.role_name;
  
    if (role === 'vendor') {
      if (order.status !== 'pending' || newStatus !== 'shipped') {
        throw new Error('INVALID_STATUS_CHANGE');
      }
    }
  
    if (role === 'admin') {
      if (!['cancelled'].includes(newStatus)) {
        throw new Error('INVALID_STATUS_CHANGE');
      }
    }
  
    if (role === 'customer') {
      throw new Error('NOT_ALLOWED');
    }
  
    order.status = newStatus;
    await order.save();
  
    return order;
  };