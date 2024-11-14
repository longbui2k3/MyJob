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
      required: true,
    },
    banner: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    aboutUs: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "User",
    },
    organizationType: {
      type: String,
      enum: Object.values(OrganizationTypes),
      required: true,
    },
    industryType: {
      type: String,
      enum: Object.values(IndustryTypes),
      required: true,
    },
    teamSize: {
      type: String,
      enum: Object.values(TeamSizes),
      required: true,
    },
    yearOfEstablishment: {
      type: Date,
      required: true,
    },
    companyWebsite: {
      type: String,
      required: true,
    },
    companyVision: {
      type: String,
      required: true,
    },
    socialMedias: {
      type: [{ socialMedia: String, linkUrl: String }],
      default: [],
    },
    mapLocation: {
      type: String,
      required: true,
    },
    provinceCode: {
      type: Number,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);
companySchema.index({ companyName: "text" });
companySchema.statics = {
  findAndSearchPartial: function (obj, q) {
    return this.find({
      ...obj,
      companyName: new RegExp(q, "gi"),
    });
  },
  findAndSearchFull: function (obj, q) {
    return this.find({
      ...obj,
      $text: { $search: q, $caseSensitive: false },
    });
  },
};

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, companySchema);
