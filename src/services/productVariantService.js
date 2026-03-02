const Product = require('../models/Product');
const ProductVariant = require('../models/ProductVariant');

exports.createVariant = async (productId, vendorId, data) => {
  const product = await Product.findOne({
    where: {
      id: productId,
      vendor_id: vendorId,
    },
  });

  if (!product) {
    throw new Error('PRODUCT_NOT_FOUND');
  }

  return await ProductVariant.create({
    product_id: productId,
    sku: data.sku,
    price: data.price,
    attributes: data.attributes,
    is_active: true,
  });
};