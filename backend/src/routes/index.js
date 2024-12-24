"use strict";

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const authen = require("./authen");
const company = require("./company");
const job = require("./job");
const category = require("./category");
const user = require("./user");
const otp = require("./otp");
const profile = require("./profile");
const favoriteJob = require("./favoriteJob");
const followedCompany = require("./followedCompany");
const resume = require("./resume");
const savedCandidate = require("./savedCandidate");
const application = require("./application");
const general = require("./general");
const message = require("./message");
const conversation = require("./conversation");
const swagger = require("../../swagger-output.json");
const router = express.Router();
router.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swagger));
// Documentation in JSON format
router.get("/api/v1/docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swagger);
});
router.use("/api/v1/user", user);
router.use("/api/v1/company", company);
router.use("/api/v1/job", job);
router.use("/api/v1/category", category);
router.use("/api/v1/otp", otp);
router.use("/api/v1/profile", profile);
router.use("/api/v1/favoriteJob", favoriteJob);
router.use("/api/v1/savedCandidate", savedCandidate);
router.use("/api/v1/resume", resume);
router.use("/api/v1/application", application);
router.use("/api/v1/general", general);
router.use("/api/v1/followedCompany", followedCompany);
router.use("/api/v1/message", message);
router.use("/api/v1/conversation", conversation);
router.use("/api/v1", authen);

module.exports = router;
