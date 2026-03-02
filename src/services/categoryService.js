const { Category } = require('../models');

exports.createCategory = async (data) => {
  return await Category.create(data);
};

exports.getAllCategories = async () => {
  return await Category.findAll({
    where: { is_active: true },
    order: [['created_at', 'DESC']],
  });
};

exports.getCategoryById = async (id) => {
  return await Category.findByPk(id);
};

exports.updateCategory = async (id, data) => {
  return await Category.update(data, {
    where: { id },
  });
};

exports.deleteCategory = async (id) => {
  return await Category.update(
    { is_active: false },
    { where: { id } }
  );
};