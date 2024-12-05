"use strict";

const express = require("express");
const { authentication } = require("../../auth/authUtils");
const { asyncHandler } = require("../../helpers/asyncHandler");
const savedCandidateController = require("../../controllers/savedCandidate.controller");
const router = express.Router();

router.use(authentication);

router.route("/:applicationId").get(
  // #swagger.tags = ['Saved Candidate']
  // #swagger.summary = 'Find save candidate'
  asyncHandler(savedCandidateController.findSavedCandidate)
);

router
  .route("/:applicationId")
  .post(
    // #swagger.tags = ['Saved Candidate']
    // #swagger.summary = 'Saved candidate'
    asyncHandler(savedCandidateController.savedCandidate)
  )
  .delete(
    // #swagger.tags = ['Saved Candidate']
    // #swagger.summary = 'Unsaved candidate'
    asyncHandler(savedCandidateController.unfavoriteJob)
  );

module.exports = router;
