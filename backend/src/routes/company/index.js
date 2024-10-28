"use strict";

const express = require("express");
const { asyncHandler } = require("../../helpers/asyncHandler");
const { authentication } = require("../../auth/authUtils");
const companyController = require("../../controllers/company.controller");
const multer = require("multer");
const { BadRequestError } = require("../../core/error.response");
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: function (req, file, callback) {
    // Allowed file types
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

    if (allowedTypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      throw new BadRequestError(
        "Only .png, .jpg, .jpeg, .webp files are allowed."
      );
    }
  },
});
const router = express.Router();

// authentication
router.use(authentication);
//////////////////

// create company
router.route("/").post(
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  // #swagger.tags = ['Company']
  // #swagger.summary = 'Create company'
  /* #swagger.security = [{
      "apiKeyAuth": [],
      "clientId": []
    }] 
  */
  asyncHandler(companyController.createCompany)
);

module.exports = router;
