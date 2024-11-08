const { convertToObjectId } = require("../../utils");
const jobModel = require("../job.model");
const BaseRepo = require("./base.repo");

class JobRepo extends BaseRepo {
  constructor() {
    super(jobModel);
  }
}

module.exports = new JobRepo();
