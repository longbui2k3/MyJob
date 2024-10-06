const { UserStatus } = require("../../helpers/constants");
const userModel = require("../user.model");
const BaseRepo = require("./baseRepo");

class UserRepo extends BaseRepo {
  constructor() {
    super(userModel);
  }
  
  async findByEmailAndActiveStatus(email) {
    return await this.findOne({ email, status: UserStatus.ACTIVE });
  }

  async findByEmailAndUnverifiedStatus(email) {
    return await this.findOne({ email, status: UserStatus.UNVERIFIED });
  }

  async findByEmailWithPassword(email) {
    return await this.findOne(
      {
        email,
      },
      {
        addedFields: ["password"],
      }
    );
  }

  async findByEmailAndOTPExpires(email) {
    return await this.findOne({
      email,
      OTPExpires: { $gt: Date.now() },
    });
  }

  async findByUsernameAndActiveStatus(username) {
    return await this.findOne({ username, status: UserStatus.ACTIVE });
  }

  async findByPasswordReset({ passwordResetToken }) {
    return await this.findOne({
      passwordResetToken,
      passwordResetExpires: { $gt: Date.now() },
    });
  }

  async updatePasswordReset(id, { passwordResetToken, passwordResetExpires }) {
    return await this.findByIdAndUpdate(id, {
      passwordResetToken,
      passwordResetExpires,
    });
  }

  async updateActiveStatus(id) {
    return await this.findByIdAndUpdate(id, { status: UserStatus.ACTIVE });
  }
}

module.exports = new UserRepo();
