"use strict";

const express = require("express");
const { authentication } = require("../../auth/authUtils");
const { asyncHandler } = require("../../helpers/asyncHandler");
const followedCompanyController = require("../../controllers/followedCompany.controller");
const router = express.Router();

router.use(authentication);

router.route("/:companyId").get(
  // #swagger.tags = ['Follow company']
  // #swagger.summary = 'Find follow company'
  asyncHandler(followedCompanyController.findFollowedCompany)
);

router
  .route("/:companyId")
  .post(
    // #swagger.tags = ['Follow company']
    // #swagger.summary = 'Follow company'
    asyncHandler(followedCompanyController.followCompany)
  )
  .delete(
    // #swagger.tags = ['Follow company']
    // #swagger.summary = 'Unfollow company'
    asyncHandler(followedCompanyController.unfollowCompany)
  );

module.exports = router;
