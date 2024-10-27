"use strict";

const express = require("express");
const { authentication } = require("../../auth/authUtils");
const { asyncHandler } = require("../../helpers/asyncHandler");
const { resendOTP } = require("../../controllers/otp.controller");
const router = express.Router();

router.route("/").post(
  // #swagger.tags = ['OTP']
  // #swagger.summary = 'Resend OTP'
  /* #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: '#/components/schemas/resendOTPBodySchema'
          },
        }
      }
    } 
  */
  asyncHandler(resendOTP)
);

module.exports = router;
