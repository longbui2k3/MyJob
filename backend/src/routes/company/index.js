"use strict";

const express = require("express");
const { asyncHandler } = require("../../helpers/asyncHandler");
const { authentication } = require("../../auth/authUtils");
const companyController = require("../../controllers/company.controller");
const router = express.Router();

// authentication
router.use(authentication);
//////////////////

// create company
router.post("", asyncHandler(companyController.createCompany));

module.exports = router;
