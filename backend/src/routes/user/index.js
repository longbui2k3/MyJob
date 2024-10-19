"use strict";

const express = require("express");
const { authentication } = require("../../auth/authUtils");
const { getMe } = require("../../controllers/user.controller");
const { asyncHandler } = require("../../helpers/asyncHandler");
const router = express.Router();

router.use(authentication);
router.route("/me").get(
  // #swagger.tags = ['User']
  // #swagger.summary = 'Get Me'
  /* #swagger.security = [{
      "apiKeyAuth": [],
      "clientId": []
    }] 
  */
  asyncHandler(getMe)
);

module.exports = router;
