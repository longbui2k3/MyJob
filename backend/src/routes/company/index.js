"use strict";

const express = require("express");
const { asyncHandler } = require("../../helpers/asyncHandler");
const { authentication } = require("../../auth/authUtils");
const companyController = require("../../controllers/company.controller");
const { uploadMulter } = require("../../helpers/uploadMulter");

const upload = uploadMulter([
  {
    fieldname: "logo",
    allowedTypes: ["image/png", "image/jpeg", "image/jpg", "image/webp"],
  },
  {
    fieldname: "banner",
    allowedTypes: ["image/png", "image/jpeg", "image/jpg", "image/webp"],
  },
]);
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
                "type": "string",
                "default": "Public"
              },
              "industryType": {
                "type": "string",
                "default": "Technology"
              },
              "teamSize": {
                "type": "string",
                "default": "201-500"
              },
              "yearOfEstablishment": {
                "type": "string",
                "default": "2015-01-01"
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
              "provinceCode": {
                "type": " number"
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
  // #swagger.tags = ['Company']
  // #swagger.summary = 'Update company'
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
  asyncHandler(companyController.updateCompany)
);

router.route("/mycompany").get(
  // #swagger.tags = ['Company']
  // #swagger.summary = 'Get my company'
  /* #swagger.security = [{
      "apiKeyAuth": [],
      "clientId": []
    }] 
  */
  asyncHandler(companyController.getMyCompany)
);

router.route("/:id").delete(
  // #swagger.tags = ['Company']
  // #swagger.summary = 'Delete my company'
  /* #swagger.parameters['id'] = {
       in: 'path',
       required: true,
       type: 'string'
  } */
  /* #swagger.security = [{
      "apiKeyAuth": [],
      "clientId": []
    }] 
  */
  asyncHandler(companyController.delteteCompany)
);

module.exports = router;
