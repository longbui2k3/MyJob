const { Schema, model } = require("mongoose");

const COLLECTION_NAME = "messages";
const DOCUMENT_NAME = "Message";

const messageSchema = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
    },
    image: {
      type: String,
    },
    replyMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
    react: {
      type: String,
    },
    conversation: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = model(DOCUMENT_NAME, messageSchema);
