"use strict";
const mongoose = require("mongoose");
const { ResumeTypes } = require("../helpers/constants");
const COLLECTION_NAME = "resumes";
const DOCUMENT_NAME = "Resume";
const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(ResumeTypes),
      required: true,
    },
    resume: {
      type: mongoose.Schema.ObjectId,
      ref: function () {
        if (this.type === ResumeTypes.CREATED_RESUME) return "CreatedResume";
        else return "UploadedResume";
      },
    },
    isPrivacy: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, resumeSchema);
