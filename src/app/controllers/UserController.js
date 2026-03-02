const userService = require('../../services/userService');
const responder = require('../../utils/responder');

exports.getMe = async (req, res) => {
  try {
    const user = await userService.getMe(req.user.id);

    if (!user) {
      return responder.responseNotFound(res, 'USER_NOT_FOUND');
    }

    return responder.responseOk(res, 'USER_FETCHED', user);
  } catch (error) {
    console.error(error);
    return responder.responseServerError(res);
  }
};

exports.updateMe = async (req, res) => {
  try {
    const user = await userService.updateMe(req.user.id, req.body);

    if (!user) {
      return responder.responseNotFound(res, 'USER_NOT_FOUND');
    }

    return responder.responseOk(res, 'USER_UPDATED', user);
  } catch (error) {
    console.error(error);
    return responder.responseServerError(res);
  }
};