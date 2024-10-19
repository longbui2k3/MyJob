"use strict";

const categoryRepo = require("../models/repos/category.repo");
const UploadFiles = require("../utils/uploadFiles");

class CategoryService {
  static async createCategory({ name }, files) {
    const iconUrl = await new UploadFiles(
      "categories",
      "images",
      files["iconUrl"][0]
    ).uploadFileAndDownloadURL();
    const imageUrl = await new UploadFiles(
      "categories",
      "images",
      files["imageUrl"][0]
    ).uploadFileAndDownloadURL();
    const category = categoryRepo.createCategory({ name, iconUrl, imageUrl });
    return category;
  }
}

module.exports = CategoryService;
