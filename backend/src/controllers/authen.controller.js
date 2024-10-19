"use strict";

const { SuccessResponse, OK, CREATED } = require("../core/success.response");
const { HEADER } = require("../helpers/constants");
const AuthenService = require("../services/authen.service");
class AuthenController {
  resetPassword = async (req, res, next) => {
    const result = await AuthenService.resetPassword(req);
    return new OK(result).send(res);
  };
  verifyOTP = async (req, res, next) => {
    const result = await AuthenService.verifyOTP(req.body);
    return new OK(result).send(res);
  };
  forgotPassword = async (req, res, next) => {
    const result = await AuthenService.forgotPassword(req.body);
    return new OK(result).send(res);
  };
  logOut = async (req, res, next) => {
    const result = await AuthenService.logOut(req.keyStore);
    return new SuccessResponse(result).send(res);
  };
  signUp = async (req, res, next) => {
    console.log("[P]::signUp::", req.body);

    const result = await AuthenService.signUp(req.body);
    return new CREATED(result).send(res);
  };
  logIn = async (req, res, next) => {
    console.log("[P]::logIn::", req.body);

    const result = await AuthenService.logIn(req.body);
    res.cookie("authorization", result.metadata.tokens.accessToken, {
      path: "/",
    });
    res.cookie("x-client-id", result.metadata.user._id, {
      path: "/",
    });
    return new SuccessResponse(result).send(res);
  };
  refreshToken = async (req, res, next) => {
    const tokens = await AuthenService.refreshToken({
      refreshToken: req.body.refreshToken,
      header_client_id: req.headers[HEADER.CLIENT_ID],
    });
    return new SuccessResponse({
      message: "Refresh access token successfully!",
      metadata: {
        tokens,
      },
    }).send(res);
  };
}

module.exports = new AuthenController();
