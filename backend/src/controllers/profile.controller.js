const { OK } = require("../core/success.response");
const ProfileService = require("../services/profile.service");

class ProfileController {
  constructor() {}

  updateProfile = async (req, res, next) => {
    const result = await ProfileService.updateProfile(
      req.user.userId,
      req.body,
      req.file
    );

    return new OK({
      message: "Update profile successfully",
      metadata: {
        profile: result,
      },
    }).send(res);
  };

  // findProfileByUserId = async (req, res, next) => {
  //   const result = await ProfileService.findProfileByUserId(req.user.userId);

  //   return new OK({
  //     message: "Find profile successfully",
  //     metadata: {
  //       profile: result,
  //     },
  //   }).send(res);
  // };

  findProfiles = async (req, res, next) => {
    const result = await ProfileService.findProfiles(req.query);

    return new OK({
      message: "Find profiles successfully",
      metadata: {
        profiles: result.data,
        meta: result.meta,
      },
    }).send(res);
  };

  findProfile = async (req, res, next) => {
    const result = await ProfileService.findProfile(req.params.id);

    return new OK({
      message: "Find profile successfully",
      metadata: {
        profile: result,
      },
    }).send(res);
  };
}
module.exports = new ProfileController();
