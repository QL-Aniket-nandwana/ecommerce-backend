const orderService = require('../../services/orderServices');
const responder = require('../../utils/responder');

exports.checkout = async (req, res) => {
  try {
    const order = await orderService.checkout(req.user.id);
    return responder.responseOk(res, 'ORDER_PLACED', order);
  } catch (error) {
    console.error(error);
    return responder.responseServerError(res);
  }
};

exports.getMyOrders = async (req, res) => {
    try {
      const orders = await orderService.getUserOrders(req.user.id);
      return responder.responseOk(res, 'ORDERS_FETCHED', orders);
    } catch (error) {
      return responder.responseServerError(res);
    }
  };
  
  exports.getOrderDetails = async (req, res) => {
    try {
      const order = await orderService.getOrderById(
        req.params.id,
        req.user.id
      );
  
      if (!order) {
        return responder.responseNotFound(res, 'ORDER_NOT_FOUND');
      }
  
      return responder.responseOk(res, 'ORDER_FETCHED', order);
    } catch (error) {
      return responder.responseServerError(res);
    }
  };


  exports.getVendorOrders = async (req, res) => {
    try {
      const orders = await orderService.getVendorOrders(req.user.id);
      return responder.responseOk(res, 'VENDOR_ORDERS_FETCHED', orders);
    } catch (error) {
      console.error(error);
      return responder.responseServerError(res);
    }
  };


  exports.updateOrderStatus = async (req, res) => {
    try {
      const { status } = req.body;
      const orderId = req.params.id;
  
      const order = await orderService.updateOrderStatus(
        orderId,
        status,
        req.user
      );
  
      return responder.responseOk(res, 'ORDER_STATUS_UPDATED', order);
    } catch (error) {
      console.error(error);
  
      if (error.message === 'ORDER_NOT_FOUND') {
        return responder.responseNotFound(res, error.message);
      }
  
      if (
        error.message === 'INVALID_STATUS_CHANGE' ||
        error.message === 'NOT_ALLOWED'
      ) {
        return responder.responseForbidden(res);
      }
  
      return responder.responseServerError(res);
    }
  };