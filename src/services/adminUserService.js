const { User, Role, UserDetail, Address } = require('../models');

exports.getAllUsers = async () => {
  return await User.findAll({
    attributes: ['id', 'name', 'email', 'phone', 'is_active'],
    include: [
      { model: Role, attributes: ['id', 'name'] },
      { model: UserDetail, as: 'details' },
    ],
    order: [['created_at', 'DESC']],
  });
};

exports.getUserById = async (userId) => {
  return await User.findByPk(userId, {
    include: [
      { model: Role, attributes: ['id', 'name'] },
      { model: UserDetail, as: 'details' },
      { model: Address, as: 'addresses' },
    ],
  });
};

exports.updateUserRole = async (userId, roleId) => {
  const role = await Role.findByPk(roleId);
  if (!role) throw new Error('ROLE_NOT_FOUND');

  const user = await User.findByPk(userId);
  if (!user) throw new Error('USER_NOT_FOUND');

  user.role_id = roleId;
  await user.save();

  return user;
};

exports.updateUserStatus = async (userId, isActive) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error('USER_NOT_FOUND');

  user.is_active = isActive;
  await user.save();

  return user;
};

exports.deleteUser = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error('USER_NOT_FOUND');

  user.is_active = false;
  await user.save();

  return true;
};