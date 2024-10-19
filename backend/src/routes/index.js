"use strict";

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const authen = require("./authen");
const company = require("./company");
const category = require("./category");
const user = require("./user");
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
router.use("/api/v1/category", category);
router.use("/api/v1", authen);

module.exports = router;
