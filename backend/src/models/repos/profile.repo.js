const profileModel = require("../profile.model");
const BaseRepo = require("./base.repo");

class ProfileRepo extends BaseRepo {
  constructor() {
    super(profileModel);
  }

  async findProfileByUser(userId) {
    return await this.findOne({ user: userId });
  }

  async createProfile({ userId, fullName }) {
    return await this.create({ user: userId, fullName });
  }

  async updateProfile(userId, body) {
    return await this.findOneAndUpdate({ user: userId }, body, {}, true);
  }
}

module.exports = new ProfileRepo();
