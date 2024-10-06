"use strict";
const mongoose = require("mongoose");
const COLLECTION_NAME = "favoritejobs";
const DOCUMENT_NAME = "FavoriteJob";
const favoritejobSchema = new mongoose.Schema(
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
module.exports = mongoose.model(DOCUMENT_NAME, favoritejobSchema);
