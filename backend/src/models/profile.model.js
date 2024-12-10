"use strict";
const mongoose = require("mongoose");
const {
  Experiences,
  Educations,
  MaritalStatus,
  UserGenders,
} = require("../helpers/constants");
const COLLECTION_NAME = "profiles";
const DOCUMENT_NAME = "Profile";
const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      unique: true,
      ref: "User",
      required: true,
    },
    avatar: { type: String, default: "" },
    fullName: { type: String, default: "" },
    title: { type: String, default: "" },
    experience: { type: String, enum: Experiences, default: Experiences.EMPTY },
    education: { type: String, enum: Educations, default: Educations.EMPTY },
    personalWebsite: { type: String, default: "" },
    mobile: { type: String, default: "" },
    mapLocation: { type: String, default: "" },
    gender: {
      type: String,
      enum: Object.values(UserGenders),
      default: UserGenders.EMPTY,
    },
    // nationality: { type: String, default: "" },
    dateOfBirth: { type: Date, default: null },
    maritalStatus: {
      type: String,
      enum: Object.values(MaritalStatus),
      default: MaritalStatus.EMPTY,
    },
    biography: { type: String, default: "" },
    address: { type: String, default: "" },
    socialMedias: {
      type: [{ type: { socialMedia: String, linkUrl: String } }],
      default: [],
    },
    provinceCode: {
      type: Number,
    },
    email: {
      type: String,
      require: true,
    },
    isPrivacy: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, profileSchema);
