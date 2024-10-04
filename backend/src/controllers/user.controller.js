const { OK } = require("../core/success.response");
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
}
module.exports = new UserController();
