"use strict";
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { UserStatus, UserRole, UserType } = require("../helpers/constants");
const COLLECTION_NAME = "users";
const DOCUMENT_NAME = "User";
const userSchema = new mongoose.Schema(
  {
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
    isDeleted: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
    },
    oldStatus: {
      type: String,
      enum: Object.values(UserStatus),
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);
userSchema.index({ username: "text" });
userSchema.statics = {
  findAndSearchPartial: function (obj, q) {
    return this.find({
      ...obj,
      username: new RegExp(q, "gi"),
    });
  },
  findAndSearchFull: function (obj, q) {
    return this.find({
      ...obj,
      $text: { $search: q, $caseSensitive: false },
    });
  },
};
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
