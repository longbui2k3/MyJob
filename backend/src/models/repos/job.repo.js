const { Types } = require("mongoose");
const { JobStatuses } = require("../../helpers/constants");
const { removeUndefinedInObject } = require("../../utils");
const { convertToObjectId } = require("../../utils");
const jobModel = require("../job.model");
const BaseRepo = require("./base.repo");

class JobRepo extends BaseRepo {
  constructor() {
    super(jobModel);
  }
  async findJobById(id) {
    return await this.findById(id);
  }
  async deleteJob(id) {
    return await this.deleteOne({ _id: new Types.ObjectId(id) });
  }

  async updateJob(id, data) {
    return await this.findByIdAndUpdate(id, removeUndefinedInObject(data));
  }

  async createJob(data) {
    return await this.create({
      ...data,
      status: JobStatuses.PENDING,
    });
  }
}

module.exports = new JobRepo();
