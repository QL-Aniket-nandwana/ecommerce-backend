const Inventory = require('../models/Inventory');
const Product = require('../models/Product');
const ProductVariant = require('../models/ProductVariant');

exports.createProduct = async (productData, vendorId) => {
  return await Product.create({
    name: productData.name,
    description: productData.description,
    category_id: productData.category_id,
    vendor_id: vendorId,
    is_active: true,
  });
};

exports.getProductsByCategory = async (categoryId) => {
  return await Product.findAll({
    where: {
      category_id: categoryId,
      is_active: true,
    },
    attributes: ['id', 'name', 'description'],
    include: [
      {
        model: ProductVariant,
        as: 'variants',
        where: { is_active: true },
        required: false,
        attributes: ['id', 'sku', 'price', 'attributes'],
        include: [
          {
            model: Inventory,
            attributes: ['quantity'],
          },
        ],
      },
    ],
  });
};

exports.getProductById = async (productId) => {
  return await Product.findByPk(productId, {
    include: [
      { model: Category },
      { model: User, as: 'vendor', attributes: ['id', 'name', 'email'] },
    ],
  });
};

exports.updateProduct = async (productId, payload, user) => {
  const product = await Product.findByPk(productId);
  if (!product) throw new Error('PRODUCT_NOT_FOUND');

  if (user.role_name === 'vendor' && product.vendor_id !== user.id) {
    throw new Error('FORBIDDEN');
  }

  await product.update({
    name: payload.name ?? product.name,
    description: payload.description ?? product.description,
    category_id: payload.category_id ?? product.category_id,
    is_active: payload.is_active ?? product.is_active,
  });

  return product;
};

exports.deleteProduct = async (productId, user) => {
  const product = await Product.findByPk(productId);
  if (!product) throw new Error('PRODUCT_NOT_FOUND');

  if (user.role_name === 'vendor' && product.vendor_id !== user.id) {
    throw new Error('FORBIDDEN');
  }

  product.is_active = false;
  await product.save();

  return true;
};