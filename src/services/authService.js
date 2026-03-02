const { User, Role } = require('../models');
const bcrypt = require('bcryptjs');

exports.getAllUsers = async () => {
  return await User.findAll();
};

exports.getUserByEmail = async (email) => {
    return await User.findOne({
      where: { email },
      include: [
        {
          model: Role,
          attributes: ['id', 'name'],
        },
      ],
    });
  };

exports.createUser = async (userData) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    
    const role = await Role.findByPk(userData.roleId);
    if (!role) {
      throw new Error('INVALID_ROLE');
    }
    console.log('userdata:', userData)
    return await User.create({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      password: hashedPassword,
      role_id: userData.roleId,
      is_active: true,
    });
  };