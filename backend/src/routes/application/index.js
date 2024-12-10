"use strict";

const express = require("express");
const { authentication } = require("../../auth/authUtils");
const { asyncHandler } = require("../../helpers/asyncHandler");
const applicationController = require("../../controllers/application.controller");
const router = express.Router();

router.use(authentication);

router.route("/check").post(
  // #swagger.tags = ['Application']
  // #swagger.summary = 'Check user applied job'
  /* #swagger.security = [{
      "apiKeyAuth": [],
      "clientId": []
    }] 
  */
  asyncHandler(applicationController.checkUserAppliedJob)
);

router.route("/:id").get(
  // #swagger.tags = ['Application']
  // #swagger.summary = 'Find application'
  /* #swagger.security = [{
      "apiKeyAuth": [],
      "clientId": []
    }] 
  */
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
  /*
    #swagger.parameters["status"] = {
      "in": "query",
      "type": "string",
      "description": "Status"
    }
  */
  /* #swagger.security = [{
      "apiKeyAuth": [],
      "clientId": []
    }] 
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

router.route("/:id").patch(
  // #swagger.tags = ['Application']
  // #swagger.summary = 'update application'
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
  asyncHandler(applicationController.updateApplication)
);
module.exports = router;
