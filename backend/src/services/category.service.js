"use strict";

const { NotFoundError } = require("../core/error.response");
const categoryRepo = require("../models/repos/category.repo");
const { removeUndefinedInObject } = require("../utils");
const UploadFiles = require("../utils/uploadFiles");

class CategoryService {
  static async createCategory({ name }, files) {
    let iconUrl = undefined;
    let imageUrl = undefined;
    if (files["iconUrl"]) {
      iconUrl = await new UploadFiles(
        "categories",
        "images",
        files["iconUrl"][0]
      ).uploadFileAndDownloadURL();
    }

    if (files["imageUrl"]) {
      imageUrl = await new UploadFiles(
        "categories",
        "images",
        files["imageUrl"][0]
      ).uploadFileAndDownloadURL();
    }
    const category = await categoryRepo.createCategory({
      name,
      iconUrl,
      imageUrl,
    });
    return category;
  }

  static async findAllCategories({ page, limit, search }) {
    return await categoryRepo.find({}, { page, limit, search });
  }

  static async findCategory(id) {
    const category = await categoryRepo.findById(id);
    if (!category) {
      throw new NotFoundError("Category not found!");
    }
    return category;
  }

  static async updateCategory(id, { name }, files) {
    const checkedCategoryExists = await categoryRepo.findById(id);
    if (!checkedCategoryExists) {
      throw new NotFoundError("Category not found!");
    }

    let iconUrl = undefined;
    let imageUrl = undefined;
    if (files["iconUrl"]) {
      iconUrl = await new UploadFiles(
        "categories",
        "images",
        files["iconUrl"][0]
      ).uploadFileAndDownloadURL();
    }

    if (files["imageUrl"]) {
      imageUrl = new UploadFiles(
        "categories",
        "images",
        files["imageUrl"][0]
      ).uploadFileAndDownloadURL();
    }

    const category = await categoryRepo.updateCategory(
      id,
      removeUndefinedInObject({
        name,
        iconUrl,
        imageUrl,
      })
    );
    return category;
  }

  static async deleteCategory(id) {
    const checkedCategoryExists = await categoryRepo.findById(id);
    if (!checkedCategoryExists) {
      throw new NotFoundError("Category not found!");
    }
    return await categoryRepo.deleteCategory(id);
  }
}

module.exports = CategoryService;
