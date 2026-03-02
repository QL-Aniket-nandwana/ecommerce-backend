const productService = require('../../services/productService');
const responder = require('../../utils/responder');

exports.createProduct = async (request, response) => {
  try {
    const vendorId = request.user.id;
    const productData = request.body;

    const product = await productService.createProduct(productData, vendorId);

    if (!product) {
      return responder.responseOKIssues(response, 'PRODUCT_NOT_CREATED', {});
    }

    return responder.responseOk(response, 'PRODUCT_CREATED', product);
  } catch (error) {
    console.error(error);

    return responder.responseServerError(response);
  }
};

exports.getProductsByCategory = async (req, res) => {
    try {
      const { category_id } = req.params;
  
      const products = await productService.getProductsByCategory(
        category_id
      );
  
      return responder.responseOk(res, 'PRODUCT_LIST', products);
    } catch (error) {
      console.error(error);
      return responder.responseServerError(res);
    }
  };

  exports.getProduct = async (req, res) => {
    try {
      const product = await productService.getProductById(req.params.id);
  
      if (!product) {
        return responder.responseNotFound(res, 'PRODUCT_NOT_FOUND');
      }
  
      return responder.responseOk(res, 'PRODUCT_FETCHED', product);
    } catch (error) {
      return responder.responseServerError(res);
    }
  };
  
  exports.updateProduct = async (req, res) => {
    try {
      const product = await productService.updateProduct(
        req.params.id,
        req.body,
        req.user
      );
  
      return responder.responseOk(res, 'PRODUCT_UPDATED', product);
    } catch (error) {
      if (
        error.message === 'PRODUCT_NOT_FOUND'
      ) {
        return responder.responseNotFound(res, error.message);
      }
  
      if (error.message === 'FORBIDDEN') {
        return responder.responseForbidden(res);
      }
  
      return responder.responseServerError(res);
    }
  };
  
  exports.deleteProduct = async (req, res) => {
    try {
      await productService.deleteProduct(req.params.id, req.user);
      return responder.responseOk(res, 'PRODUCT_DELETED', {});
    } catch (error) {
      if (error.message === 'PRODUCT_NOT_FOUND') {
        return responder.responseNotFound(res, error.message);
      }
  
      if (error.message === 'FORBIDDEN') {
        return responder.responseForbidden(res);
      }
  
      return responder.responseServerError(res);
    }
  };