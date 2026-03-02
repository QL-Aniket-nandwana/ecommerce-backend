const ProductVariant = require('../models/ProductVariant');
const Inventory = require('../models/Inventory');
const Product = require('../models/Product');

exports.setInventory = async (variantId, vendorId, quantity) => {
  const variant = await ProductVariant.findOne({
    where: { id: variantId },
    include: [
        {
          model: Product,
          as: 'product',
        },
      ]
      });
console.log('variant',variant)
  if (!variant || variant.product.vendor_id !== vendorId) {
    throw new Error('VARIANT_NOT_FOUND');
  }

  const [inventory] = await Inventory.findOrCreate({
    where: { product_variant_id: variantId },
    defaults: { quantity },
  });

  if (!inventory.isNewRecord) {
    inventory.quantity = quantity;
    await inventory.save();
  }

  return inventory;
};

exports.getInventoryByProduct = async (productId) => {
  return await Inventory.findAll({
    include: [
      {
        model: ProductVariant,
        where: { product_id: productId },
        include: [
          {
            model: Product,
            attributes: ['id', 'name', 'vendor_id'],
          },
        ],
      },
    ],
  });
};

exports.updateInventory = async (inventoryId, quantity, user) => {
  const inventory = await Inventory.findByPk(inventoryId, {
    include: [
      {
        model: ProductVariant,
        include: [
          {
            model: Product,
          },
        ],
      },
    ],
  });

  if (!inventory) throw new Error('INVENTORY_NOT_FOUND');

  const product = inventory.product_variant.product;

  if (user.role_name === 'vendor' && product.vendor_id !== user.id) {
    throw new Error('FORBIDDEN');
  }

  inventory.quantity = quantity;
  await inventory.save();

  return inventory;
};