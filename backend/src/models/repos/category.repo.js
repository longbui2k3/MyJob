const { JobStatuses } = require("../../helpers/constants");
const categoryModel = require("../category.model");
const BaseRepo = require("./base.repo");
const jobRepo = require("./job.repo");

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

  async updateOpenPositionNum() {
    const categories = await categoryModel.find();
    await Promise.all(
      categories.map(async (category) => {
        const openPositionNum = await jobRepo.countDocuments({
          "category": category._id,
          status: JobStatuses.ACTIVE,
        });
        await this.findByIdAndUpdate(category._id, {
          openPositionNum,
        });
      })
    );
  }
}

module.exports = new CategoryRepo();
