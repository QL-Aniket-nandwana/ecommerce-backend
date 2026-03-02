const { Address } = require('../models');

exports.createAddress = async (addressData) => {
    console.log('Creating address with data:', addressData);
  return await Address.create(addressData);
};

exports.getAddressesByUser = async (userId) => {
  return await Address.findAll({
    where: { user_id: userId },
    order: [['is_default', 'DESC'], ['created_at', 'DESC']],
  });
};

exports.getAddressById = async (id, userId) => {
  return await Address.findOne({
    where: {
      id,
      user_id: userId,
    },
  });
};

exports.updateAddress = async (id, userId, updateData) => {
  return await Address.update(updateData, {
    where: {
      id,
      user_id: userId,
    },
  });
};

exports.deleteAddress = async (id, userId) => {
  return await Address.destroy({
    where: {
      id,
      user_id: userId,
    },
  });
};