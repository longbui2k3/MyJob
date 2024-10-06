const profileModel = require("../profile.model");
const BaseRepo = require("./baseRepo");

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
}

module.exports = new ProfileRepo();
