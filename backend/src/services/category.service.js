"use strict";

const categoryRepo = require("../models/repos/category.repo");
const UploadFiles = require("../utils/uploadFiles");

class CategoryService {
  static async createCategory({ name }, files) {
    const [iconUrl, imageUrl] = await Promise.all([
      new UploadFiles(
        "categories",
        "images",
        files["iconUrl"][0]
      ).uploadFileAndDownloadURL(),
      new UploadFiles(
        "categories",
        "images",
        files["imageUrl"][0]
      ).uploadFileAndDownloadURL(),
    ]);
    const category = await categoryRepo.createCategory({
      name,
      iconUrl,
      imageUrl,
    });
    return category;
  }

  static async findAllCategories({ limit }) {
    return await categoryRepo.find({}, { limit });
  }
}

module.exports = CategoryService;
