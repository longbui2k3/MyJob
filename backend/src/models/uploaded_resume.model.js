"use strict";
const mongoose = require("mongoose");

const COLLECTION_NAME = "uploaded_resumes";
const DOCUMENT_NAME = "UploadedResume";
const uploadedResumeSchema = new mongoose.Schema(
  {
    file_url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, uploadedResumeSchema);
