"use strict";

const express = require("express");
const { authentication } = require("../../auth/authUtils");
const { getMe } = require("../../controllers/user.controller");
const { asyncHandler } = require("../../helpers/asyncHandler");
const router = express.Router();

router.use(authentication);
router.route("/me").get(asyncHandler(getMe));

module.exports = router;
