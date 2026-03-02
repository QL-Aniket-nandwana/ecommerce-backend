const AddressService = require('../../services/addressService');
const responder = require('../../utils/responder');

exports.createAddress = async (req, res) => {
    try {
  
      const address = await AddressService.createAddress({
        ...req.body,
        user_id: req.user.id,
      });
  
      return responder.responseOk(res, 'ADDRESS_CREATED', address);
    } catch (error) {
      return responder.responseServerError(res);
    }
  };

exports.getAddresses = async (req, res) => {
  try {
    const addresses = await AddressService.getAddressesByUser(req.user.id);
    return responder.responseOk(res, 'ADDRESS_LIST', addresses);
  } catch (error) {
    return responder.responseServerError(res);
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const address = await AddressService.getAddressById(id, req.user.id);
    if (!address) {
      return responder.responseOKIssues(res, 'ADDRESS_NOT_FOUND', {});
    }

    await AddressService.updateAddress(id, req.user.id, req.body);
    return responder.responseOk(res, 'ADDRESS_UPDATED', {});
  } catch (error) {
    return responder.responseServerError(res);
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const address = await AddressService.getAddressById(id, req.user.id);
    if (!address) {
      return responder.responseOKIssues(res, 'ADDRESS_NOT_FOUND', {});
    }

    await AddressService.deleteAddress(id, req.user.id);
    return responder.responseOk(res, 'ADDRESS_DELETED', {});
  } catch (error) {
    return responder.responseServerError(res);
  }
};