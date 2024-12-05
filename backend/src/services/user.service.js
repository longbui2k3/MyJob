"use strict";

const { BadRequestError, NotFoundError } = require("../core/error.response");
const { UserType } = require("../helpers/constants");
const applicationRepo = require("../models/repos/application.repo");
const favoriteJobRepo = require("../models/repos/favoriteJob.repo");
const savedCandidateRepo = require("../models/repos/savedCandidate.repo");
const companyRepo = require("../models/repos/company.repo");
const profileRepo = require("../models/repos/profile.repo");
const userRepo = require("../models/repos/user.repo");

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
      username: user.username,
      fullName: profile ? profile.fullName : company ? company.companyName : "",
      avatar: profile ? profile.avatar : company ? company.logo : "",
      ...(user.userType === UserType.EMPLOYER
        ? { hasCompany: Boolean(company) }
        : {}),
    };
  }

  static statisticizeJobs = async (userId) => {
    const user = await userRepo.findById(userId);
    if (!user) {
      throw new BadRequestError("User not found!");
    }

    const [applicationsNum, favoritedJobsNum] = await Promise.all([
      applicationRepo.countDocuments({
        user: userId,
      }),
      favoriteJobRepo.countDocuments({ user: userId }),
    ]);

    return {
      applicationsNum,
      favoritedJobsNum,
    };
  };

  static findAppliedJobsByUser = async (userId, { page = 1, limit = 10 }) => {
    const user = await userRepo.findById(userId);
    if (!user) {
      throw new BadRequestError("User not found!");
    }

    const applications = await applicationRepo.find(
      {
        user: user._id,
      },
      {
        populates: ["job"],
        page,
        limit,
      }
    );
    return applications;
  };

  static findFavoriteJobsByUser = async (userId, { page = 1, limit = 10 }) => {
    const user = await userRepo.findById(userId);
    if (!user) {
      throw new BadRequestError("User not found!");
    }

    const favoriteJobs = await favoriteJobRepo.find(
      {
        user: user._id,
      },
      {
        populates: ["job"],
        page,
        limit,
      }
    );
    favoriteJobs.data = favoriteJobs.data.map((job) => job.job);
    return favoriteJobs;
  };

  static findSavedCandidatesByUser = async (
    userId,
    { page = 1, limit = 10 }
  ) => {
    const user = await userRepo.findById(userId);
    if (!user) {
      throw new BadRequestError("User not found!");
    }
    const savedCandidates = await savedCandidateRepo.find(
      {
        user: user._id,
      },
      {
        page,
        limit,
        populates: ["candidate.profile"],
        populateSelects: [
          { profile: "avatar fullName title provinceCode experience" },
        ],
      }
    );
    savedCandidates.data = savedCandidates.data.map(
      (savedCandidate) => savedCandidate.candidate
    );

    return savedCandidates;
  };
}

module.exports = UserService;
