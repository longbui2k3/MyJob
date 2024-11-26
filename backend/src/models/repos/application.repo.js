const applicationModel = require("../application.model");
const BaseRepo = require("./base.repo");

class ApplicationRepo extends BaseRepo {
  constructor() {
    super(applicationModel);
  }
}

module.exports = new ApplicationRepo();
