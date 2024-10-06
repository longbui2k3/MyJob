"use strict";
const mongoose = require("mongoose");
const COLLECTION_NAME = "jobalerts";
const DOCUMENT_NAME = "JobAlert";
const jobalertSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, jobalertSchema);
