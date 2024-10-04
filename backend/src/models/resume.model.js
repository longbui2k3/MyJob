"use strict";
const mongoose = require("mongoose");
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
    file: {
      type: String,
      required: true,
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
