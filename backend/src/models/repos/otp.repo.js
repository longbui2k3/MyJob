const OTPModel = require("../otp.model");
const BaseRepo = require("./base.repo");

class OTPRepo extends BaseRepo {
  constructor() {
    super(OTPModel);
  }
}

module.exports = new OTPRepo();
