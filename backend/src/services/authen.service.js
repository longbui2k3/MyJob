"use strict";

const {
  BadRequestError,
  InternalServerError,
  AuthFailureError,
} = require("../core/error.response");
const {
  getInfoData,
  removeUndefinedInObject,
  hashString,
  createTokenString,
  convertToObjectId,
} = require("../utils");
const KeyTokenService = require("./keytoken.service");
const { createTokenPair } = require("../auth/authUtils");
const Email = require("../utils/email");
const generateOTPConfig = require("../utils/generateOTP.config");
const JWT = require("jsonwebtoken");
const userRepo = require("../models/repos/userRepo");
const {
  OTP_LENGTH,
  PASSWORD_RESET_EXPIRES,
  OTP_EXPIRES,
  ACCESS_TOKEN_EXPIRES,
  UserType,
  UserStatus,
} = require("../helpers/constants");
const profileRepo = require("../models/repos/profileRepo");
const companyRepo = require("../models/repos/company.repo");

class AuthenService {
  static async #createTokens(user) {
    const publicKey = createTokenString(64);
    const privateKey = createTokenString(64);

    const keytoken = await KeyTokenService.createKeyToken({
      userId: convertToObjectId(user._id),
      privateKey,
      publicKey,
    });

    if (!keytoken) {
      throw new BadRequestError("Keytoken Error");
    }

    const tokens = await createTokenPair(
      { userId: user._id, email: user.email, role: user.role },
      publicKey,
      privateKey
    );
    return tokens;
  }
  static resetPassword = async ({
    body: { password, passwordConfirm },
    params,
  }) => {
    const passwordResetToken = hashString(params.token);
    const user = await userRepo.findByPasswordReset({ passwordResetToken });
    if (!user) {
      throw new BadRequestError("Your token is invalid or has expired.");
    }

    if (password !== passwordConfirm) {
      throw new AuthFailureError("Passwords do not match! Please try again!");
    }

    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    user.password = password;
    await user.save({ validateBeforeSave: false });

    const tokens = await this.#createTokens(user);
    return {
      message: "Reset Password Successfully!",
      metadata: {
        user: getInfoData({ object: user, fields: ["_id", "name", "email"] }),
        tokens,
      },
    };
  };
  // type: forgotPwd, signUp
  static verifyOTP = async ({ email, OTP }) => {
    const user = await userRepo.findByEmailAndOTPExpires(email);
    if (!user) {
      throw new BadRequestError(
        "There is no user with email address or OTP has expired!"
      );
    }
    const hashOTP = hashString(OTP);
    if (user.OTP !== hashOTP) {
      throw new AuthFailureError(
        "Your entered OTP is invalid! Please try again!"
      );
    }

    user.OTP = undefined;
    user.OTPExpires = undefined;
    await user.save({ validateBeforeSave: false });
    await userRepo.updateActiveStatus(user._id);
    if (user) {
      const tokens = await this.#createTokens(user);
      return {
        message: "Sign up successfully!",
        metadata: {
          user: getInfoData({
            object: user,
            fields: ["_id", "name", "email"],
          }),
          tokens,
        },
      };
    }
    return {
      statusCode: 200,
      metadata: null,
    };
  };
  static forgotPassword = async ({ email }) => {
    const user = await userRepo.findByEmailAndActiveStatus(email);
    if (!user) {
      throw new BadRequestError("There is no user with email address!");
    }

    const resetToken = createTokenString(32);
    const passwordResetToken = hashString(resetToken);
    const passwordResetExpires = Date.now() + PASSWORD_RESET_EXPIRES; // 10p hiệu lực

    await userRepo.updatePasswordReset(user._id, {
      passwordResetToken,
      passwordResetExpires,
    });

    try {
      await new Email({ type: "forgot", email, value: resetToken }).sendEmail();
    } catch (error) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      user.save({ validateBeforeSave: false });

      throw new InternalServerError(
        "There was an error sending the email. Try again later!"
      );
    }

    return {
      message: "OTP sent to email!",
    };
  };
  static logOut = async (keyStore) => {
    const delKey = await KeyTokenService.removeKeyById(keyStore._id);
    console.log({ delKey });
    return delKey;
  };
  static signUp = async ({
    userType,
    fullName,
    username,
    email,
    password,
    passwordConfirm,
  }) => {
    if (
      !fullName ||
      !username ||
      !email ||
      !password ||
      !passwordConfirm ||
      !userType
    ) {
      throw new BadRequestError("Error: Please fill all the fields!");
    }

    if (!Object.values(UserType).includes(userType)) {
      throw new BadRequestError(
        `Error: User type should be ${UserType.EMPLOYEE} or ${UserType.EMPLOYER}`
      );
    }

    const existingUsername = await userRepo.findByUsernameAndActiveStatus(
      username
    );
    if (existingUsername) {
      throw new BadRequestError("Error: Username already exists!");
    }

    const existingUser = await userRepo.findByEmailAndActiveStatus(email);
    if (existingUser) {
      throw new BadRequestError("Error: User already registered!");
    }

    const existingUnverifiedUser =
      await userRepo.findByEmailAndUnverifiedStatus(email);

    if (password !== passwordConfirm) {
      throw new AuthFailureError("Passwords do not match! Please try again!");
    }

    const newUser =
      existingUnverifiedUser ||
      (await userRepo.create(
        removeUndefinedInObject({
          username,
          email,
          password,
          passwordConfirm,
          status: UserStatus.UNVERIFIED,
          userType,
        })
      ));

    const OTP = generateOTPConfig(OTP_LENGTH);
    const hashOTP = hashString(OTP);
    newUser.OTP = hashOTP;
    newUser.OTPExpires = Date.now() + OTP_EXPIRES;
    await newUser.save({ validateBeforeSave: false });

    await profileRepo.createProfile({
      userId: newUser._id,
      fullName,
    });

    try {
      await new Email({ type: "signup", email, value: OTP }).sendEmail();
    } catch (err) {
      throw new InternalServerError(
        "There was an error sending the email. Try again later!"
      );
    }

    return {
      message: "OTP sent to email!",
    };
  };

  static logIn = async ({ email, password }) => {
    if (!email || !password) {
      throw new BadRequestError("Error: Please enter email or password!");
    }

    const user = await userRepo.findByEmailWithPassword(email);
    if (!user || !(await user.matchPassword(password))) {
      throw new AuthFailureError("Error: Incorrect email or password!");
    }
    if (user.status === UserStatus.UNVERIFIED) {
      throw new AuthFailureError(
        "Error: This account is unverified! Please sign up again!"
      );
    }

    const tokens = await this.#createTokens(user);
    
    return {
      statusCode: 200,
      message: "Log in successfully!",
      metadata: {
        user: removeUndefinedInObject({
          ...getInfoData({
            object: user,
            fields: ["_id", "name", "email", "role"],
          }),
        }),
        tokens,
      },
    };
  };

  static refreshToken = async ({ refreshToken, header_client_id }) => {
    const userId = header_client_id;
    if (!userId) {
      throw new AuthFailureError("Invalid Request!");
    }
    const keyStore = await KeyTokenService.findByUserId(userId);
    if (!keyStore) {
      throw new NotFoundError("Not Found KeyStore!");
    }
    const decodedUser = JWT.verify(refreshToken, keyStore.privateKey);
    if (decodedUser.userId !== userId) {
      throw new AuthFailureError("Invalid UserId");
    }

    const accessToken = await JWT.sign(
      {
        userId: decodedUser.userId,
        email: decodedUser.email,
        role: decodedUser.role,
      },
      keyStore.publicKey,
      {
        expiresIn: ACCESS_TOKEN_EXPIRES,
      }
    );

    return {
      accessToken,
      timeExpired: Date.now() + ACCESS_TOKEN_EXPIRES,
    };
  };
}

module.exports = AuthenService;
