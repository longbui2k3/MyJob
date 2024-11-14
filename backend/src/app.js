require("dotenv").config();
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

//thiết lập database
require("./dbs/init.mongodb");
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
    status: "error",
    code: statusCode,
    err: error.stack,
    message: error.message || "Internal Server Error",
    isSuccess: error.isSuccess,
  });
});

module.exports = app;
