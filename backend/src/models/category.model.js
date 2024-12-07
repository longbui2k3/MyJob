"use strict";
const mongoose = require("mongoose");
const COLLECTION_NAME = "categories";
const DOCUMENT_NAME = "Category";
const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    iconUrl: { type: String, required: true },
    imageUrl: { type: String, required: true },
    openPositionNum: { type: Number, required: true, default: 0 },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);
categorySchema.index({ name: "text" });
categorySchema.statics = {
  findAndSearchPartial: function (obj, q) {
    return this.find({
      ...obj,
      name: new RegExp(q, "gi"),
    });
  },
  findAndSearchFull: function (obj, q) {
    return this.find({
      ...obj,
      $text: { $search: q, $caseSensitive: false },
    });
  },
};

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, categorySchema);
