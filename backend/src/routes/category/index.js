"use strict";

const express = require("express");
const { authentication } = require("../../auth/authUtils");
const { asyncHandler } = require("../../helpers/asyncHandler");
const { uploadMulter } = require("../../helpers/uploadMulter");
const categoryController = require("../../controllers/category.controller");

const router = express.Router();
const upload = uploadMulter(
  ["image/png", "image/jpeg", "image/jpg", "image/webp"],
  "Only .png, .jpg, .jpeg, .webp files are allowed."
);
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
