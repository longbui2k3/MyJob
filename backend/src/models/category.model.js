"use strict";
const mongoose = require("mongoose");
const COLLECTION_NAME = "categories";
const DOCUMENT_NAME = "Category";
const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, categorySchema);
