"use strict";

const express = require("express");
const AuthenController = require("../../controllers/authen.controller");
const { asyncHandler } = require("../../helpers/asyncHandler");
const { authentication } = require("../../auth/authUtils");
const router = express.Router();

router.route("/signup").post(
  // #swagger.tags = ['Authentication']
  // #swagger.summary = 'Sign Up'
  /* #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: '#/components/schemas/signUpBodySchema'
          },
        }
      }
    } 
  */
  asyncHandler(AuthenController.signUp)
);
router.route("/login").post(
  // #swagger.tags = ['Authentication']
  // #swagger.summary = 'Login'
  /* #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: '#/components/schemas/logInBodySchema'
          },
        }
      }
    }
  */
  asyncHandler(AuthenController.logIn)
);
router.route("/forgotPassword").post(
  // #swagger.tags = ['Authentication']
  // #swagger.summary = 'Forgot Password'
  /* #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: '#/components/schemas/forgotPasswordBodySchema'
          },
        }
      }
    }
  */
  /* #swagger.responses[200] = {
      description: "OK",
      content: {
          "application/json": {
            schema:{
              $ref: '#/components/schemas/forgotPasswordResponse200Schema'
            }
          }           
      }
    }   
  */
  /* #swagger.responses[400] = {
      description: "Bad Request",
      content: {
        "application/json": {
          schema:{
            $ref: '#/components/schemas/forgotPasswordResponse400Schema'
          }
        }           
      }
    }   
  */
  /* #swagger.responses[424] = {
      description: "Failed Dependency",
      content: {
        "application/json": {
          schema: {
            $ref: '#/components/schemas/forgotPasswordResponse424Schema'
          }
        }
      }
    }   
  */
  asyncHandler(AuthenController.forgotPassword)
);
router.route("/resetPassword/:token").post(
  // #swagger.tags = ['Authentication']
  // #swagger.summary = 'Reset Password'
  /* #swagger.parameters['token'] = {
    in: 'path',
    description: 'Reset Password Token',
    type: 'string'
  }
  */
  /* #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          $ref: '#/components/schemas/resetPasswordBodySchema'
        },
      }
    }
  }
  */
  /* #swagger.responses[200] = {
      description: "OK",
      content: {
        "application/json": {
          schema:{
            $ref: '#/components/schemas/resetPasswordResponse200Schema'
          }
        }           
      }
    }   
  */
  /* #swagger.responses[400] = {
      description: "Bad Request",
      content: {
        "application/json": {
          schema:{
            $ref: '#/components/schemas/resetPasswordResponse400Schema'
          }
        }           
      }
    }   
  */
  /* #swagger.responses[401] = {
      description: "Auth Failure",
      content: {
        "application/json": {
          schema:{
            $ref: '#/components/schemas/resetPasswordResponse401Schema'
          }
        }           
      }
    }   
  */
  asyncHandler(AuthenController.resetPassword)
);
router.route("/verify").post(
  // #swagger.tags = ['Authentication']
  // #swagger.summary = 'Verify OTP'
  asyncHandler(AuthenController.verifyOTP)
);
router.route("/refreshToken").post(
  // #swagger.tags = ['Authentication']
  // #swagger.summary = 'Refresh Token'
  asyncHandler(AuthenController.refreshToken)
);
//authentication
router.use(authentication);

////////////////////
router.route("/logout").post(
  // #swagger.tags = ['Authentication']
  // #swagger.summary = 'Logout'
  /* #swagger.security = [{
      "apiKeyAuth": [],
      "clientId": []
    }] 
  */
  asyncHandler(AuthenController.logOut)
);

const authen = router;
module.exports = authen;
