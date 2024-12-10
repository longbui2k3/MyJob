"use strict";
const mongoose = require("mongoose");
const COLLECTION_NAME = "followedcompanies";
const DOCUMENT_NAME = "FollowedCompany";
const followedCompanySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, followedCompanySchema);
