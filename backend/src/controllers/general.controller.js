const { OK } = require("../core/success.response");
const GeneralService = require("../services/general.service");
const OTPService = require("../services/otp.service");

class GeneralController {
  constructor() {}

  sendEmail = async (req, res, next) => {
    await GeneralService.sendEmail(req.user.email, req.body);

    return new OK({
      message: "Send email successfully!",
    }).send(res);
  };
}
module.exports = new GeneralController();
