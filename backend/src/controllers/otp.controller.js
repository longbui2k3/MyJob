const { OK } = require("../core/success.response");
const OTPService = require("../services/otp.service");

class UserController {
  constructor() {}

  resendOTP = async (req, res, next) => {
    const result = await OTPService.resendOTP({
      email: req.body.email,
    });

    return new OK(result).send(res);
  };
}
module.exports = new UserController();
