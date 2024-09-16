"use strict";
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { UserStatus, UserRole, UserType, UserGender } = require("../helpers/constants");
const COLLECTION_NAME = "users";
const DOCUMENT_NAME = "User";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name!"],
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.UNVERIFIED,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
    userType: {
      type: String,
      enum: Object.values(UserType),
      default: UserType.EMPLOYEE,
    },
    avatar: { type: String },
    gender: {
      type: String,
      enum: Object.values(UserGender),
    },
    dateOfBirth: { type: Date, default: null },
    address: { type: String, default: "" },
    mobile: { type: String, default: "" },
    password: {
      type: String,
      required: [true, "Please provide your password!"],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please provide your password confirm!"],
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: "Passwords are not the same!",
      },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    OTP: String,
    OTPExpires: Date,
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, userSchema);
