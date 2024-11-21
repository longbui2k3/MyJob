const companyModel = require("../company.model");
const { removeUndefinedInObject } = require("../../utils");
const { Types } = require("mongoose");
const BaseRepo = require("./base.repo");

class CompanyRepo extends BaseRepo {
  constructor() {
    super(companyModel);
  }

  async findCompanyByUser(user_id) {
    return await this.findOne({ user: user_id });
  }
  async findCompanyById(id) {
    return await this.findById(id);
  }

  async deleteCompany(id) {
    return await this.deleteOne({ _id: new Types.ObjectId(id) });
  }

  async updateCompany(id, data) {
    return await this.findByIdAndUpdate(id, removeUndefinedInObject(data), {
      new: true,
    });
  }

  async createCompany(data) {
    return await this.create(data);
  }
}

module.exports = new CompanyRepo();
