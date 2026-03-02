const adminUserService = require('../../services/adminUserService');
const responder = require('../../utils/responder');

exports.getUsers = async (req, res) => {
  try {
    const users = await adminUserService.getAllUsers();
    return responder.responseOk(res, 'USERS_FETCHED', users);
  } catch {
    return responder.responseServerError(res);
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await adminUserService.getUserById(req.params.id);
    if (!user) return responder.responseNotFound(res, 'USER_NOT_FOUND');
    return responder.responseOk(res, 'USER_FETCHED', user);
  } catch {
    return responder.responseServerError(res);
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const { role_id } = req.body;
    const user = await adminUserService.updateUserRole(
      req.params.id,
      role_id
    );
    return responder.responseOk(res, 'USER_ROLE_UPDATED', user);
  } catch (error) {
    if (error.message === 'ROLE_NOT_FOUND')
      return responder.responseNotFound(res, error.message);

    if (error.message === 'USER_NOT_FOUND')
      return responder.responseNotFound(res, error.message);

    return responder.responseServerError(res);
  }
};

exports.updateUserStatus = async (req, res) => {
  try {
    const { is_active } = req.body;
    const user = await adminUserService.updateUserStatus(
      req.params.id,
      is_active
    );
    return responder.responseOk(res, 'USER_STATUS_UPDATED', user);
  } catch (error) {
    if (error.message === 'USER_NOT_FOUND')
      return responder.responseNotFound(res, error.message);

    return responder.responseServerError(res);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await adminUserService.deleteUser(req.params.id);
    return responder.responseOk(res, 'USER_DELETED', {});
  } catch (error) {
    if (error.message === 'USER_NOT_FOUND')
      return responder.responseNotFound(res, error.message);

    return responder.responseServerError(res);
  }
};