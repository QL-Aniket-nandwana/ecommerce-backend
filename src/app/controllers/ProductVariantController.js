const variantService = require('../../services/productVariantService');
const responder = require('../../utils/responder');

exports.createVariant = async (req, res) => {
  try {
    const vendorId = req.user.id;
    const { product_id, sku, price, attributes } = req.body;

    const variant = await variantService.createVariant(
      product_id,
      vendorId,
      { sku, price, attributes }
    );

    return responder.responseOk(res, 'VARIANT_CREATED', variant);
  } catch (error) {
    if (error.message === 'PRODUCT_NOT_FOUND') {
      return responder.responseOKIssues(res, 'PRODUCT_NOT_FOUND', {});
    }

    if (error.name === 'SequelizeUniqueConstraintError') {
      return responder.responseOKIssues(res, 'SKU_ALREADY_EXISTS', {});
    }

    console.error(error);
    return responder.responseServerError(res);
  }
};