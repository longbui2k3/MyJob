const { CREATED } = require("../core/success.response");
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
}
module.exports = new CategoryController();
