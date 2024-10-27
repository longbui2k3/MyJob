"use strict";

const express = require("express");
const { authentication } = require("../../auth/authUtils");
const { asyncHandler } = require("../../helpers/asyncHandler");
const { uploadMulter } = require("../../helpers/uploadMulter");
const categoryController = require("../../controllers/category.controller");

const router = express.Router();
const upload = uploadMulter([
  {
    fieldname: "imageUrl",
    allowedTypes: ["image/png", "image/jpeg", "image/jpg", "image/webp"],
  },
  {
    fieldname: "iconUrl",
    allowedTypes: ["image/svg+xml"],
  },
]);

router.route("/").get(
  // #swagger.tags = ['Category']
  // #swagger.summary = 'Get all categories'
  /* #swagger.parameters = [
    {
      "in": "query",
      "name": "limit",
      "description": "Limit number of categories to return"
    }
  ] 
  */
  asyncHandler(categoryController.findAllCategories));

router.use(authentication);
router.route("/").post(
  upload.fields([
    { name: "iconUrl", maxCount: 1 },
    { name: "imageUrl", maxCount: 1 },
  ]),
  // #swagger.tags = ['Category']
  // #swagger.summary = 'Create category'
  /* #swagger.requestBody = {
      required: true,
      content: {
        "multipart/form-data": {
          "schema": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                },
                "iconUrl": {
                    "type": "string",
                    "format": "binary"
                },
                "imageUrl": {
                    "type": "string",
                    "format": "binary"
                }
            }
          },
        }
      }
    } 
  */
  /* #swagger.security = [{
      "apiKeyAuth": [],
      "clientId": []
    }] 
  */
  asyncHandler(categoryController.createCategory)
);

module.exports = router;
