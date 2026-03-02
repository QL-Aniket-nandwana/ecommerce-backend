const cartService = require('../../services/cartService');
const responder = require('../../utils/responder');

exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { product_variant_id, quantity } = req.body;

    const item = await cartService.addToCart(
      userId,
      product_variant_id,
      quantity
    );

    return responder.responseOk(res, 'ITEM_ADDED_TO_CART', item);
  } catch (error) {
    if (error.message === 'OUT_OF_STOCK') {
      return responder.responseOKIssues(res, 'OUT_OF_STOCK', {});
    }

    console.error(error);
    return responder.responseServerError(res);
  }
};

exports.getCart = async (req, res) => {
    try {
      const cart = await cartService.getCart(req.user.id);
  
      if (!cart) {
        return responder.responseOk(res, 'CART_EMPTY', { items: [], total: 0 });
      }
  
      return responder.responseOk(res, 'CART_FETCHED', cart);
    } catch (error) {
      console.error(error);
      return responder.responseServerError(res);
    }
  };

  exports.updateCartItem = async (req, res) => {
    try {
      const userId = req.user.id;
      const cartItemId = req.params.id;
      const { quantity } = req.body;
  
      if (quantity < 0) {
        return responder.responseOKIssues(res, 'INVALID_QUANTITY', {});
      }
  
      const result = await cartService.updateCartItemQuantity(
        userId,
        cartItemId,
        quantity
      );
  
      if (!result) {
        return responder.responseOKIssues(res, 'CART_ITEM_NOT_FOUND', {});
      }
  
      return responder.responseOk(res, 'CART_UPDATED', result);
    } catch (error) {
      console.error(error);
      return responder.responseServerError(res);
    }
  };