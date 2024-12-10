"use strict";

const express = require("express");
const { authentication } = require("../../auth/authUtils");
const {
  getMe,
  findAppliedJobsByUser,
  statisticizeJobs,
  findFavoriteJobsByUser,
  findProfileByUserId,
  findSavedCandidatesByUser,
} = require("../../controllers/user.controller");
const { asyncHandler } = require("../../helpers/asyncHandler");
const userController = require("../../controllers/user.controller");
const router = express.Router();

router.use(authentication);
router.route("/").get(asyncHandler(userController.findUsers));

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

router.route("/applied-jobs").get(
  // #swagger.tags = ['User']
  // #swagger.summary = 'Find Applied Jobs By User'
  /* #swagger.security = [{
    "apiKeyAuth": [],
    "clientId": []
  }] 
  */
  asyncHandler(findAppliedJobsByUser)
);

router.route("/favorite-jobs").get(
  // #swagger.tags = ['User']
  // #swagger.summary = 'Find Favorite Jobs By User'
  /* #swagger.security = [{
    "apiKeyAuth": [],
    "clientId": []
  }] 
  */
  asyncHandler(findFavoriteJobsByUser)
);

router.route("/saved-candidates").get(
  // #swagger.tags = ['User']
  // #swagger.summary = 'Find Saved Candidates By User'
  /* #swagger.security = [{
    "apiKeyAuth": [],
    "clientId": []
  }] 
  */
  asyncHandler(findSavedCandidatesByUser)
);

router.route("/job-statistics").get(
  // #swagger.tags = ['User']
  // #swagger.summary = 'Statisticize jobs'
  /* #swagger.security = [{
    "apiKeyAuth": [],
    "clientId": []
  }] 
  */
  asyncHandler(statisticizeJobs)
);

router.route("/profile").get(asyncHandler(findProfileByUserId));

module.exports = router;
