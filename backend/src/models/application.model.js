"use strict";
const mongoose = require("mongoose");
const { ApplicationStatuses } = require("../helpers/constants");
const COLLECTION_NAME = "applications";
const DOCUMENT_NAME = "Application";
const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },
    coverLetter: {
      type: String,
    },
    appliedAt: {
      type: Date,
      default: Date.now(),
    },
    status: {
      type: String,
      enum: Object.values(ApplicationStatuses),
      default: ApplicationStatuses.SUBMITTED,
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, applicationSchema);
