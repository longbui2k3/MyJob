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

router.route("/").get(
  // #swagger.tags = ['Company']
  // #swagger.summary = 'Find companies'
  /* #swagger.parameters["page"] = {
    "in": "query",
    "type": "number",
    "description": "Page"
  }
  */
  /*
    #swagger.parameters["limit"] = {
      "in": "query",
      "type": "number",
      "description": "Limit"
    }
  */
  /*
    #swagger.parameters["search"] = {
      "in": "query",
      "type": "string",
      "description": "Search"
    }
  */
  asyncHandler(companyController.findCompanies)
);
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
  /* #swagger.requestBody = {
      required: true,
      content: {
        "multipart/form-data": {
          "schema": {
            "type": "object",
            "properties": {
              "logo": {
                "type": "string",
                "format": "binary"
              },
              "banner": {
                "type": "string",
                "format": "binary"
              },
              "companyName": {
                "type": "string"
              },
              "aboutUs": {
                "type": "string"
              },
              "organizationType": {
                "type": "string"
              },
              "industryType": {
                "type": "string"
              },
              "teamSize": {
                "type": "string"
              },
              "yearOfEstablishment": {
                "type": "string"
              },
              "companyWebsite": {
                "type": "string"
              },
              "companyVision": {
                "type": "string"
              },
              "socialMedias": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "socialMedia": {
                      "type": "string"
                    },
                    "linkUrl": {
                      "type": "string"
                    }
                  }
                }
              },
              "mapLocation": {
                "type": "string"
              },
              "phone": {
                "type": "string"
              },
              "email": {
                "type": "string"
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
  asyncHandler(companyController.createCompany)
);

// update company
router.route("/:id").patch(
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  asyncHandler(companyController.updateCompany)
);

router.route("/mycompany").get(asyncHandler(companyController.getMyCompany));

module.exports = router;
