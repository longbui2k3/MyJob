const { OK } = require("../core/success.response");
const ProfileService = require("../services/profile.service");
const UserService = require("../services/user.service");

class UserController {
  constructor() {}

  getMe = async (req, res, next) => {
    const result = await UserService.getMe(req.user.userId);

    return new OK({
      message: "Get me successfully",
      metadata: {
        user: result,
      },
    }).send(res);
  };

  findProfileByUserId = async (req, res, next) => {
    const result = await ProfileService.findProfileByUserId(req.user.userId);

    return new OK({
      message: "Find profile by user successfully",
      metadata: {
        profile: result,
      },
    }).send(res);
  };

  findAppliedJobsByUser = async (req, res, next) => {
    const result = await UserService.findAppliedJobsByUser(
      req.user.userId,
      req.query
    );

    return new OK({
      message: "Find applied jobs successfully",
      metadata: {
        applications: result.data,
        meta: result.meta,
      },
    }).send(res);
  };

  findFavoriteJobsByUser = async (req, res, next) => {
    const result = await UserService.findFavoriteJobsByUser(
      req.user.userId,
      req.query
    );

    return new OK({
      message: "Find favorite jobs successfully",
      metadata: {
        favoriteJobs: result.data,
        meta: result.meta,
      },
    }).send(res);
  };

  findSavedCandidatesByUser = async (req, res, next) => {
    const result = await UserService.findSavedCandidatesByUser(
      req.user.userId,
      req.query
    );

    return new OK({
      message: "Find saves candidates successfully",
      metadata: {
        savedCandidates: result.data,
        meta: result.meta,
      },
    }).send(res);
  };

  statisticizeJobs = async (req, res, next) => {
    const result = await UserService.statisticizeJobs(req.user.userId);

    return new OK({
      message: "Statisticize jobs successfully",
      metadata: result,
    }).send(res);
  };
}
module.exports = new UserController();
