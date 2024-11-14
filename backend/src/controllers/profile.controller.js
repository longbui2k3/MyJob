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
}
module.exports = new ProfileController();
