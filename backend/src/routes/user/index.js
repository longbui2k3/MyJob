"use strict";

const express = require("express");
const { authentication } = require("../../auth/authUtils");
const {
  getMe,
  findAppliedJobsByUser,
  statisticizeJobs,
  findFavoriteJobsByUser,
} = require("../../controllers/user.controller");
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

module.exports = router;
