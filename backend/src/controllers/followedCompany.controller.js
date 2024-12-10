const { OK } = require("../core/success.response");
const FollowedCompanyService = require("../services/followedCompany.service");

class FollowedCompanyController {
  constructor() {}

  findFollowedCompany = async (req, res, next) => {
    const result = await FollowedCompanyService.findFollowedCompany(
      req.user.userId,
      req.params.companyId
    );

    return new OK({
      message: "Find followed company successfully",
      metadata: {
        followedCompany: result,
      },
    }).send(res);
  };

  followCompany = async (req, res, next) => {
    const result = await FollowedCompanyService.followCompany(
      req.user.userId,
      req.params.companyId
    );

    return new OK({
      message: "Follow company successfully",
      metadata: {
        followedCompany: result,
      },
    }).send(res);
  };

  unfollowCompany = async (req, res, next) => {
    const result = await FollowedCompanyService.unfollowCompany(
      req.user.userId,
      req.params.companyId
    );

    return new OK({
      message: "Unfollow company successfully",
      metadata: {},
    }).send(res);
  };
}
module.exports = new FollowedCompanyController();
