"use strict";
const mongoose = require("mongoose");
const { OTP_EXPIRES } = require("../helpers/constants");
const COLLECTION_NAME = "otps";
const DOCUMENT_NAME = "Otp";
const otpSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    otp: { type: String, required: true },
    otpExpires: {
      type: Date,
      default: Date.now(),
      index: { expires: OTP_EXPIRES },
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, otpSchema);
