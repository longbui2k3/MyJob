"use strict";

const express = require("express");
const { authentication } = require("../../auth/authUtils");
const { asyncHandler } = require("../../helpers/asyncHandler");
const favoriteJobController = require("../../controllers/favoriteJob.controller");
const router = express.Router();

router.use(authentication);

router.route("/:jobId").get(
  // #swagger.tags = ['Favorite']
  // #swagger.summary = 'Find favorite job'
  asyncHandler(favoriteJobController.findFavoriteJob)
);

router
  .route("/:jobId")
  .post(
    // #swagger.tags = ['Favorite']
    // #swagger.summary = 'Favorite job'
    asyncHandler(favoriteJobController.favoriteJob)
  )
  .delete(
    // #swagger.tags = ['Favorite']
    // #swagger.summary = 'Unfavorite job'
    asyncHandler(favoriteJobController.unfavoriteJob)
  );

module.exports = router;
