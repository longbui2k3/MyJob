"use strict";

const express = require("express");
const { authentication } = require("../../auth/authUtils");
const { asyncHandler } = require("../../helpers/asyncHandler");
const { updateProfile } = require("../../controllers/profile.controller");
const { uploadMulter } = require("../../helpers/uploadMulter");
const router = express.Router();

const upload = uploadMulter([
  {
    fieldname: "avatar",
    allowedTypes: ["image/png", "image/jpeg", "image/jpg", "image/webp"],
  },
]);

router.use(authentication);
router.route("/").patch(
  upload.single("avatar"),
  // #swagger.tags = ['Profile']
  // #swagger.summary = 'Update profile'
  /* #swagger.requestBody = {
      required: true,
      content: {
        "multipart/form-data": {
          "schema": {
            "type": "object",
            "properties": {
              "avatar": {
                "type": "string",
                "format": "binary"
              },
              "fullName": {
                "type": "string"
              },
              "title": {
                "type": "string"
              },
              "experience": {
                "type": "string",
                "default": "Intern"
              },
              "educations": {
                "type": "string",
                "default": "Intermediate"
              },
              "personalWebsite": {
                "type": ""
              },
              "mobile": {
                "type": ""
              },
              "mapLocation": {
                "type": ""
              },
              "gender": {
                "type": "string",
                "default": "male"
              },
              "nationality": {
                "type": ""
              },
              "dateOfBirth": {
                "type": "string",
                "default": "2024-01-01"
              },
              "maritalStatus": {
                "type": ""
              },
              "biography": {
                "type": ""
              },
              "address": {
                "type": ""
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
              "isPrivacy": {
                "type": "boolean",
                "default": false
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
  asyncHandler(updateProfile)
);

module.exports = router;
