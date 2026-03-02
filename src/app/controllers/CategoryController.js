const CategoryService = require('../../services/categoryService');
const responder = require('../../utils/responder');

exports.createCategory = async (req, res) => {
  try {
    await CategoryService.createCategory(req.body);
    return responder.responseOk(res, 'CATEGORY_CREATED', {});
  } catch (error) {
    return responder.responseServerError(res);
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await CategoryService.getAllCategories();
    return responder.responseOk(res, 'CATEGORY_LIST', categories);
  } catch (error) {
    return responder.responseServerError(res);
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await CategoryService.getCategoryById(id);
    if (!category) {
      return responder.responseOKIssues(res, 'CATEGORY_NOT_FOUND', {});
    }

    await CategoryService.updateCategory(id, req.body);
    return responder.responseOk(res, 'CATEGORY_UPDATED', {});
  } catch (error) {
    return responder.responseServerError(res);
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await CategoryService.getCategoryById(id);
    if (!category) {
      return responder.responseOKIssues(res, 'CATEGORY_NOT_FOUND', {});
    }

    await CategoryService.deleteCategory(id);
    return responder.responseOk(res, 'CATEGORY_DELETED', {});
  } catch (error) {
    return responder.responseServerError(res);
  }
};