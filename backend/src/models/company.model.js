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
    provinceCode: {
      type: Number,
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
  }
};

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, companySchema);
