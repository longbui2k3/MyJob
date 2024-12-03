"use strict";
const mongoose = require("mongoose");
const COLLECTION_NAME = "savedcandidates";
const DOCUMENT_NAME = "SavedCandidate";
const savedcandidateSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: true,
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, savedcandidateSchema);
