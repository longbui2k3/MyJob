"use strict";

const { BadRequestError, NotFoundError } = require("../core/error.response");
const { UserType } = require("../helpers/constants");
const companyRepo = require("../models/repos/company.repo");
const profileRepo = require("../models/repos/profileRepo");
const userRepo = require("../models/repos/userRepo");

class UserService {
  static async getMe(userId) {
    const [user, profile, company] = await Promise.all([
      userRepo.findById(userId),
      profileRepo.findProfileByUser(userId),
      companyRepo.findCompanyByUser(userId),
    ]);

    if (!user) {
      throw new NotFoundError("User not found!");
    }

    return {
      _id: user._id,
      userType: user.userType,
      fullName: profile ? profile.fullName : "",
      avatar: profile ? profile.avatar : "",
      ...(user.userType === UserType.EMPLOYER
        ? { hasCompany: Boolean(company) }
        : {}),
    };
  }
}

module.exports = UserService;
