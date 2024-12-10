const followedcompanyModel = require("../followedcompany.model");
const BaseRepo = require("./base.repo");

class FollowedCompanyRepo extends BaseRepo {
  constructor() {
    super(followedcompanyModel);
  }
}

module.exports = new FollowedCompanyRepo();
