const { Schema, model } = require("mongoose");

const COLLECTION_NAME = "conversations";
const DOCUMENT_NAME = "Conversations";

const conversationSchema = new Schema(
  {
    name: String,
    participants: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
      ],
      default: [],
    },
    // type: { type: String, default: "normal", enum: ["normal", "AI"] },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

module.exports = model(DOCUMENT_NAME, conversationSchema);
