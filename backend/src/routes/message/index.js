"use strict";

const express = require("express");
const { authentication } = require("../../auth/authUtils");
const { asyncHandler } = require("../../helpers/asyncHandler");
const { uploadMulter } = require("../../helpers/uploadMulter");
const messageController = require("../../controllers/message.controller");

const upload = uploadMulter([
  {
    fieldname: "file",
    allowedTypes: ["image/png", "image/jpeg", "image/jpg", "image/webp"],
  },
]);
const router = express.Router();
router.use(authentication);
router
  .route("/")
  .post(upload.single("file"), asyncHandler(messageController.sendMessage))
  .get(asyncHandler(messageController.findByConversation));
router
  .route("/:messageId")
  .delete(asyncHandler(messageController.deleteMessage));
module.exports = router;
