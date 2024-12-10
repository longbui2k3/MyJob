"use strict";

const express = require("express");
const { authentication } = require("../../auth/authUtils");
const { asyncHandler } = require("../../helpers/asyncHandler");
const { sendEmail } = require("../../controllers/general.controller");
const generalController = require("../../controllers/general.controller");
const router = express.Router();
router.use(authentication);
router
  .route("/statistics")
  .get(asyncHandler(generalController.generalStatistics));
router.route("/email").post(
  // #swagger.tags = ['General']
  // #swagger.summary = 'Send email'
  /* #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
            schema: {
                $ref: '#/components/schemas/sendEmailSchema'
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
  asyncHandler(sendEmail)
);

module.exports = router;
