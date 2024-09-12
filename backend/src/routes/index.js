"use strict";

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const authen = require("./authen");
const company = require("./company");
const swagger = require("../../swagger-output.json");
const keytokenRepo = require("../models/repos/keytokenRepo");
const { convertToObjectId } = require("../utils");
const userRepo = require("../models/repos/userRepo");
const router = express.Router();
router.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swagger));
// Documentation in JSON format
router.get("/api/v1/docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swagger);
});
// router.get("/api/v1/test", async (req, res, next) => {
//   const keyToken = await keytokenRepo.findById("66d9d64146b07f25803d4c4f", {
//     populates: ["user"],
//     unselect: ["user"],
//   });
//   const b = await keytokenRepo.findOne({
//     user: convertToObjectId("66d9d5daf64dfe524969c2e0"),
//   });

//   const c = await keytokenRepo.find();
//   const d = await userRepo.findById("66d9d5daf64dfe524969c2e0", {
//     select: ["password"],
//   });
//   res.send({
//     body: keyToken,
//     b: b,
//     c,
//     d
//   });
// });
router.use("/api/v1/company", company);
router.use("/api/v1", authen);

module.exports = router;
