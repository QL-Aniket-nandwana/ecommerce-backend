const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');
const Inventory = require('../models/Inventory');
const Product = require('../models/Product');
const ProductVariant = require('../models/ProductVariant');

exports.addToCart = async (userId, variantId, quantity) => {
  const inventory = await Inventory.findOne({
    where: { product_variant_id: variantId },
  });

  if (!inventory || inventory.quantity < quantity) {
    throw new Error('OUT_OF_STOCK');
  }

  const [cart] = await Cart.findOrCreate({
    where: { user_id: userId, is_active: true },
  });

  const [item, created] = await CartItem.findOrCreate({
    where: {
      cart_id: cart.id,
      product_variant_id: variantId,
    },
    defaults: { quantity },
  });

  if (!created) {
    item.quantity += quantity;
    await item.save();
  }

  return item;
};

exports.getCart = async (userId) => {
    const cart = await Cart.findOne({
      where: {
        user_id: userId,
        is_active: true,
      },
      include: [
        {
          model: CartItem,
          as: 'items',
          attributes: ['id', 'quantity'],
          include: [
            {
              model: ProductVariant,
              attributes: ['id', 'sku', 'price', 'attributes'],
              include: [
                {
                  model: Product,
                  attributes: ['id', 'name'],
                },
                {
                  model: Inventory,
                  attributes: ['quantity'],
                },
              ],
            },
          ],
        },
      ],
    });
  
    if (!cart) return null;
  
    let total = 0;
  
    const items = cart.items.map((item) => {
        const variant = item.product_variant;
      
        const price = parseFloat(variant.price);
        const quantity = item.quantity;
        const itemTotal = price * quantity;
      
        total += itemTotal;
      
        return {
          id: item.id,
          product: variant.product.name,
          sku: variant.sku,
          price,
          quantity,
          stock: variant.inventory?.quantity || 0,
          item_total: itemTotal,
        };
      });
  
    return {
      items,
      total,
    };
  };


  exports.updateCartItemQuantity = async (userId, cartItemId, quantity) => {
    const cartItem = await CartItem.findOne({
      where: { id: cartItemId },
      include: [
        {
          model: ProductVariant,
          include: [Inventory],
        },
        {
          model: Cart,
          where: { user_id: userId },
        },
      ],
    });
  
    if (!cartItem) return null;
  
    if (quantity === 0) {
      await cartItem.destroy();
      return { removed: true };
    }
  
    const availableStock =
    cartItem.product_variant.inventory.quantity || 0;
  
    if (quantity > availableStock) {
      throw new Error('INSUFFICIENT_STOCK');
    }
  
    cartItem.quantity = quantity;
    await cartItem.save();
  
    return cartItem;
  };