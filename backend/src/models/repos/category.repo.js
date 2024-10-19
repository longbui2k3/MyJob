const categoryModel = require("../category.model");
const BaseRepo = require("./baseRepo");

class CategoryRepo extends BaseRepo {
  constructor() {
    super(categoryModel);
  }
  async createCategory({ name, iconUrl, imageUrl }) {
    return await this.create({ name, iconUrl, imageUrl });
  }
}

module.exports = new CategoryRepo();
