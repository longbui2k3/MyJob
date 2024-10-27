const OTPModel = require("../otp.model");
const BaseRepo = require("./baseRepo");

class OTPRepo extends BaseRepo {
  constructor() {
    super(OTPModel);
  }
}

module.exports = new OTPRepo();