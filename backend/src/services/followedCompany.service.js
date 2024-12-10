"use strict";

const { BadRequestError } = require("../core/error.response");
const followedCompanyRepo = require("../models/repos/followedCompany.repo");

class FollowedCompanyService {
  static findFollowedCompany = async (userId, companyId) => {
    const followedCompany = await followedCompanyRepo.findOne({
      user: userId,
      company: companyId,
    });
    if (!followedCompany) {
      throw new BadRequestError(
        "The company has been selected as followed already"
      );
    }
    return followedCompany;
  };
  static followCompany = async (userId, companyId) => {
    const followedCompany = await followedCompanyRepo.findOne({
      user: userId,
      company: companyId,
    });
    if (followedCompany) {
      throw new BadRequestError(
        "The company has been selected as followed already"
      );
    }
    return await followedCompanyRepo.create({
      user: userId,
      company: companyId,
    });
  };

  static unfollowCompany = async (userId, companyId) => {
    const followedCompany = await followedCompanyRepo.findOne({
      user: userId,
      company: companyId,
    });
    if (!followedCompany) {
      throw new BadRequestError(
        "The company hasn't been selected as followed yet"
      );
    }
    return await followedCompanyRepo.deleteOne({
      user: userId,
      company: companyId,
    });
  };
}

module.exports = FollowedCompanyService;
