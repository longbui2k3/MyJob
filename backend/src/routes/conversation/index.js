"use strict";

const express = require("express");
const { authentication } = require("../../auth/authUtils");
const { asyncHandler } = require("../../helpers/asyncHandler");
const conversationController = require("../../controllers/conversation.controller");

const router = express.Router();
router.use(authentication);
router
  .route("/")
  .get(asyncHandler(conversationController.getAllConversations))
  .post(asyncHandler(conversationController.createConversation));
router
  .route("/:conversation")
  .get(asyncHandler(conversationController.getConversation))
  .delete(asyncHandler(conversationController.deleteConversation));

module.exports = router;
