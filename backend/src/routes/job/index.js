"use strict";

const express = require("express");
const { asyncHandler } = require("../../helpers/asyncHandler");
const { authentication } = require("../../auth/authUtils");
const jobController = require("../../controllers/job.controller");

const router = express.Router();

// authentication
router.use(authentication);
//////////////////

// create job
router.route("/").post(asyncHandler(jobController.createJob));

// update job
router.route("/:id").post(asyncHandler(jobController.updateJob));
module.exports = router;
