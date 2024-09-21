"use strict";
const mongoose = require("mongoose");
const COLLECTION_NAME = "companys";
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
      enum: [
        "",
        "Public",
        "Private",
        "Non-Profit",
        "Government",
        "Partnership",
        "Sole Proprietorship",
        "Corporation",
      ],
      default: "",
    },
    industry_type: {
      type: String,
      enum: [
        "",
        "Technology",
        "Finance",
        "Healthcare",
        "Manufacturing",
        "Retail",
        "Education",
        "Real Estate",
        "Hospitality",
        "Consulting",
        "Transportation",
      ],
      default: "",
    },
    team_size: {
      type: String,
      enum: [
        "",
        "1-10",
        "11-50",
        "51-200",
        "201-500",
        "501-1000",
        "1001-5000",
        "5001-10000",
        "10001+",
      ],
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
