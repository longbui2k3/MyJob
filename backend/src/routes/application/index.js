"use strict";

const express = require("express");
const { authentication } = require("../../auth/authUtils");
const { asyncHandler } = require("../../helpers/asyncHandler");
const applicationController = require("../../controllers/application.controller");
const router = express.Router();

router.use(authentication);

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
