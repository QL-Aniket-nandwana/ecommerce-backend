const { User, UserDetail, Role, Address } = require('../models');

exports.getMe = async (userId) => {
  return await User.findByPk(userId, {
    attributes: ['id', 'name', 'email', 'phone', 'is_active'],
    include: [
      {
        model: Role,
        attributes: ['id', 'name'],
      },
      {
        model: UserDetail,
        as: 'details',
      },
      {
        model: Address,
        as: 'addresses',
      },
    ],
  });
};

exports.updateMe = async (userId, payload) => {
  const user = await User.findByPk(userId);
  if (!user) return null;

  await user.update({
    name: payload.name ?? user.name,
    phone: payload.phone ?? user.phone,
  });

  const [details] = await UserDetail.findOrCreate({
    where: { user_id: userId },
  });

  await details.update({
    first_name: payload.first_name,
    last_name: payload.last_name,
    gender: payload.gender,
    dob: payload.dob,
  });

  return await exports.getMe(userId);
};