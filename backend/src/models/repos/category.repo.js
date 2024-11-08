const categoryModel = require("../category.model");
const BaseRepo = require("./base.repo");

class CategoryRepo extends BaseRepo {
  constructor() {
    super(categoryModel);
  }
  async createCategory({ name, iconUrl, imageUrl }) {
    return await this.create({ name, iconUrl, imageUrl });
  }
  async updateCategory(id, { name, iconUrl, imageUrl }) {
    return await this.findByIdAndUpdate(id, { name, iconUrl, imageUrl });
  }
  async deleteCategory(id) {
    return await this.deleteOne({ _id: id });
  }

  
}

module.exports = new CategoryRepo();
