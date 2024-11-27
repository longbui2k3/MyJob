"use strict";

const express = require("express");
const { authentication } = require("../../auth/authUtils");
const { asyncHandler } = require("../../helpers/asyncHandler");
const applicationController = require("../../controllers/application.controller");
const router = express.Router();

router.use(authentication);

router.route("/:id").get(
  // #swagger.tags = ['Application']
  // #swagger.summary = 'Find application'
  asyncHandler(applicationController.findApplication)
);

router.route("/").get(
  // #swagger.tags = ['Application']
  // #swagger.summary = 'Find applications'
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
    #swagger.parameters["job"] = {
      "in": "query",
      "type": "string",
      "description": "Job"
    }
  */
  asyncHandler(applicationController.findApplications)
);

router.route("/").post(
  // #swagger.tags = ['Application']
  // #swagger.summary = 'Create application'
  /* #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
            schema: {
                $ref: '#/components/schemas/applicationBodySchema'
            }
        }
      }
    } 
  */
  /* #swagger.security = [{
      "apiKeyAuth": [],
      "clientId": []
    }] 
  */
  asyncHandler(applicationController.createApplication)
);
module.exports = router;
