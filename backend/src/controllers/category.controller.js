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
    const result = await CategoryService.findAllCategories(req.query);

    return new OK({
      message: "Get all categories successfully",
      metadata: {
        categories: result,
      },
    }).send(res);
  };
}
module.exports = new CategoryController();
