"use strict";

const {
  InternalServerError,
  BadRequestError,
  AuthFailureError,
} = require("../core/error.response");
const otpRepo = require("../models/repos/otp.repo");
const bcrypt = require("bcrypt");
const userRepo = require("../models/repos/user.repo");
const generateOTPConfig = require("../utils/generateOTP.config");
const Email = require("../utils/email");
const { OTP_LENGTH } = require("../helpers/constants");

class OTPService {
  static async createOTP({ otp, email }) {
    const salt = await bcrypt.genSalt(10);
    const hashedOTP = await bcrypt.hash(otp, salt);
    return await otpRepo.create({ otp: hashedOTP, email });
  }

  static async verifyOTP({ email, otp }) {
    const otpHolders = await otpRepo.find({ email });
    if (!otpHolders.length) {
      throw new BadRequestError("Expired OTP");
    }

    async function validOTP({ otp, hashOtp }) {
      return await bcrypt.compare(otp, hashOtp);
    }

    // get last otp
    const lastOTP = otpHolders[otpHolders.length - 1];
    const isValid = await validOTP({
      otp,
      hashOtp: lastOTP.otp,
    });
    if (!isValid) {
      throw new AuthFailureError("Invalid OTP!");
    }

    return isValid && email === lastOTP.email;
  }

  static async resendOTP({ email }) {
    const [existingUser, existingUnverifiedUser] = await Promise.all([
      userRepo.findByExistedEmail(email),
      userRepo.findByEmailAndUnverifiedStatus(email),
    ]);
    if (existingUser) {
      throw new BadRequestError("Error: Email already exists!");
    }

    if (!existingUnverifiedUser) {
      throw new BadRequestError("Error: Email is not registered!");
    }

    const otp = generateOTPConfig(OTP_LENGTH);

    try {
      await Promise.all([
        new Email({ type: "signup", email, value: otp }).sendEmail(),
        this.createOTP({ email, otp }),
      ]);
    } catch (err) {
      throw new InternalServerError(
        "There was an error sending the email. Try again later!"
      );
    }

    return {
      message: "OTP sent to email!",
    };
  }
}

module.exports = OTPService;
