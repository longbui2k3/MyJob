const { UserStatus } = require("../../helpers/constants");
const userModel = require("../user.model");
const BaseRepo = require("./base.repo");

class UserRepo extends BaseRepo {
  constructor() {
    super(userModel);
  }

  async findByEmail(email) {
    return await this.findOne({ email });
  }

  async findByExistedEmail(email) {
    return await this.findOne({
      email,
      status: {
        $in: [UserStatus.ACTIVE, UserStatus.INACTIVE],
      },
    });
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

  async findByExistedUsername(username) {
    return await this.findOne({
      username,
      status: {
        $in: [UserStatus.ACTIVE, UserStatus.INACTIVE],
      },
    });
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
