"use strict";
const mongoose = require("mongoose");
const {
  OrganizationTypes,
  IndustryTypes,
  TeamSizes,
} = require("../helpers/constants");
const COLLECTION_NAME = "companies";
const DOCUMENT_NAME = "Company";
const companySchema = new mongoose.Schema(
  {
    logo: {
      type: String,
      // require: true,
      default: "",
    },
    banner: {
      type: String,
      // require: true,
      default: "",
    },
    companyName: {
      type: String,
      required: true,
    },
    aboutUs: {
      type: String,
      default: "",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "User",
    },
    organizationType: {
      type: String,
      enum: OrganizationTypes,
      default: OrganizationTypes.EMPTY,
    },
    industryType: {
      type: String,
      enum: IndustryTypes,
      default: IndustryTypes.EMPTY,
    },
    teamSize: {
      type: String,
      enum: TeamSizes,
      default: TeamSizes.EMPTY,
    },
    yearOfEstablishment: {
      type: Date,
      // require: true,
      default: null,
    },
    companyWebsite: {
      type: String,
      // require: true,
      default: "",
    },
    companyVision: {
      type: String,
      default: "",
    },
    socialMedias: {
      type: [{ socialMedia: String, linkUrl: String }],
      default: [],
    },
    mapLocation: {
      type: String,
      // require: true,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      // required: true,
      // lowercase: true,
      // unique: true,
      default: "",
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, companySchema);
