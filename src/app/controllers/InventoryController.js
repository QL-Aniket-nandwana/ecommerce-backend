const inventoryService = require('../../services/inventoryService');
const responder = require('../../utils/responder');

exports.setInventory = async (req, res) => {
  try {
    const vendorId = req.user.id;
    const { product_variant_id, quantity } = req.body;

    const inventory = await inventoryService.setInventory(
      product_variant_id,
      vendorId,
      quantity
    );

    return responder.responseOk(res, 'INVENTORY_UPDATED', inventory);
  } catch (error) {
    if (error.message === 'VARIANT_NOT_FOUND') {
      return responder.responseOKIssues(res, 'VARIANT_NOT_FOUND', {});
    }

    console.error(error);
    return responder.responseServerError(res);
  }
};

exports.getInventoryByProduct = async (req, res) => {
  try {
    const inventory = await inventoryService.getInventoryByProduct(
      req.params.productId
    );

    return responder.responseOk(res, 'INVENTORY_FETCHED', inventory);
  } catch (error) {
    console.error(error);
    return responder.responseServerError(res);
  }
};

exports.updateInventory = async (req, res) => {
  try {
    const { quantity } = req.body;

    const inventory = await inventoryService.updateInventory(
      req.params.id,
      quantity,
      req.user
    );

    return responder.responseOk(res, 'INVENTORY_UPDATED', inventory);
  } catch (error) {
    console.error(error);

    if (error.message === 'INVENTORY_NOT_FOUND') {
      return responder.responseNotFound(res, error.message);
    }

    if (error.message === 'FORBIDDEN') {
      return responder.responseForbidden(res);
    }

    return responder.responseServerError(res);
  }
};