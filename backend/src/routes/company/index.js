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
  /* #swagger.parameters = [{
    "in": "query",
    "name": "page",
    "type": "number",
    "description": "Page"
  }, 
  {
    "in": "query",
    "name": "limit",
    "type": "number",
    "description": "Limit"
  },
  {
    "in": "query",
    "name": "search",
    "type": "number",
    "description": "Search"
  }]*/
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
                "format": "binary",
                "allowEmptyValue": true
              },
              "banner": {
                "type": "string",
                "format": "binary"
              },
              "companyName": {
                "type": "string",
                "allowEmptyValue": true
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
                "type": "string",
                "allowEmptyValue": true
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
