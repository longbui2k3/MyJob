const { Types } = require("mongoose");
const { JobStatuses } = require("../../helpers/constants");
const { removeUndefinedInObject } = require("../../utils");
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
  async deleteJobsByCompanyId(companyId) {
    return await this.deleteMany({ "company._id": companyId });
  }

  async updateJob(id, data) {
    return await this.findByIdAndUpdate(id, removeUndefinedInObject(data), {
      new: true,
    });
  }

  async updateExpiredJobs() {
    return await this.updateMany(
      { expirationDate: { $lt: new Date() } },
      { $set: { status: JobStatuses.EXPIRED } }
    );
  }

  async updateActiveJob(id) {
    const today = new Date();

    const update = await this.findOneAndUpdate(
      {
        _id: id,
        expirationDate: { $gte: today },
      },
      {
        $set: { status: JobStatuses.ACTIVE },
      },
      { new: true }
    );
    return update;
  }

  async updateCompanyForJob(companyId, companyData) {
    return await this.updateMany(
      { "company._id": companyId },
      {
        $set: {
          "company.companyName": companyData.companyName,
          "company.logo": companyData.logo,
          "company.mapLocation": companyData.mapLocation,
          "company.provinceCode": companyData.provinceCode,
        },
      }
    );
  }

  async createJob(data) {
    return await this.create({
      ...data,
      status: JobStatuses.ACTIVE,
    });
  }
}

module.exports = new JobRepo();
