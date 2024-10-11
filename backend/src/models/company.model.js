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
    logo_img: {
      type: String,
      // require: true,
      default: "",
    },
    banner_img: {
      type: String,
      // require: true,
      default: "",
    },
    company_name: {
      type: String,
      required: true,
    },
    about_us: {
      type: String,
      default: "",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "User",
    },
    organization_type: {
      type: String,
      enum: OrganizationTypes,
      default: OrganizationTypes.EMPTY,
    },
    industry_type: {
      type: String,
      enum: IndustryTypes,
      default: IndustryTypes.EMPTY,
    },
    team_size: {
      type: String,
      enum: TeamSizes,
      default: TeamSizes.EMPTY,
    },
    year_of_establishment: {
      type: Date,
      // require: true,
      default: null,
    },
    company_website: {
      type: String,
      // require: true,
      default: "",
    },
    company_vision: {
      type: String,
      default: "",
    },
    socialMedias: {
      type: [{ type: { socialMedia: String, linkUrl: String } }],
      default: [],
    },
    map_location: {
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
