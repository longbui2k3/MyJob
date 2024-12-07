require("dotenv").config();
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cron = require("node-cron");
const jobModel = require("./models/job.model");
const { JobStatuses } = require("./helpers/constants");
const jobRepo = require("./models/repos/job.repo");
const companyRepo = require("./models/repos/company.repo");
const categoryRepo = require("./models/repos/category.repo");
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

//thiết lập database
require("./dbs/init.mongodb");

//kiem tra job het han sau moi mot phut
cron.schedule("* * * * *", async () => {
  await jobRepo.updateExpiredJobs();
  await companyRepo.updateOpenPositionNum();
  await categoryRepo.updateOpenPositionNum();
  console.log("Update expire status successfully!");
});

//load router
app.use("", require("./routes"));

// handling error
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  console.log("Error", error.status);
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    status: statusCode,
    err: error.stack,
    message: error.message || "Internal Server Error",
    isSuccess: error.isSuccess,
  });
});

module.exports = app;
