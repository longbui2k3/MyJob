const { CREATED, OK } = require("../core/success.response");
const CategoryService = require("../services/category.service");

class CategoryController {
  constructor() {}

  createCategory = async (req, res, next) => {
    const result = await CategoryService.createCategory(req.body, req.files);

    return new CREATED({
      message: "Create category successfully",
      metadata: {
        category: result,
      },
    }).send(res);
  };

  findAllCategories = async (req, res, next) => {
    const result = await CategoryService.findAllCategories({
      page: req.query.page - 0,
      limit: req.query.limit - 0,
      search: req.query.search,
    });

    return new OK({
      message: "Get all categories successfully",
      metadata: {
        categories: result.data,
        meta: result.meta,
      },
    }).send(res);
  };

  findCategory = async (req, res, next) => {
    const result = await CategoryService.findCategory(req.params.id);

    return new OK({
      message: "Get category successfully",
      metadata: {
        category: result,
      },
    }).send(res);
  };

  updateCategory = async (req, res, next) => {
    const result = await CategoryService.updateCategory(
      req.params.id,
      req.body,
      req.files
    );

    return new OK({
      message: "Update category successfully",
      metadata: {
        category: result,
      },
    }).send(res);
  };

  deleteCategory = async (req, res, next) => {
    await CategoryService.deleteCategory(req.params.id);

    return new OK({
      message: "Delete category successfully",
    }).send(res);
  };
}
module.exports = new CategoryController();
