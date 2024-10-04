"use strict";

const { BadRequestError, NotFoundError } = require("../core/error.response");
const profileRepo = require("../models/repos/profileRepo");
const userRepo = require("../models/repos/userRepo");

class UserService {
  static async getMe(userId) {
    const [user, profile] = await Promise.all([
      userRepo.findById(userId),
      profileRepo.findProfileByUser(userId),
    ]);

    if (!user) {
      throw new NotFoundError("User not found!");
    }
    if (!profile) {
      throw new NotFoundError("Profile not found!");
    }

    return {
      _id: user._id,
      userType: user.userType,
      fullName: profile.fullName,
      avatar: profile.avatar,
    };
  }
}

module.exports = UserService;
