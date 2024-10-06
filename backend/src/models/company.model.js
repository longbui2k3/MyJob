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
      require: true,
    },
    banner_img: {
      type: String,
      require: true,
    },
    company_name: {
      type: String,
      required: true,
    },
    about_us: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "User",
    },
    organization_type: {
      type: String,
      enum: OrganizationTypes,
      default: "",
    },
    industry_type: {
      type: String,
      enum: IndustryTypes,
      default: "",
    },
    team_size: {
      type: String,
      enum: TeamSizes,
      default: "",
    },
    year_of_establishment: {
      type: Date,
      require: true,
    },
    company_website: {
      type: String,
      require: true,
    },
    company_vision: String,
    social_media: {
      type: Array,
      default: [],
    },
    map_location: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, companySchema);
