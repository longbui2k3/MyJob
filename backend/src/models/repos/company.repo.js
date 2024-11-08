const companyModel = require("../company.model");
const { removeUndefinedInObject } = require("../../utils");
const BaseRepo = require("./base.repo");
const UploadFiles = require("../../utils/uploadFiles");

class CompanyRepo extends BaseRepo {
  constructor() {
    super(companyModel);
  }

  async findCompanyByUser(user_id) {
    return await this.findOne({ user: user_id });
  }

  async updateCompany(
    id,
    {
      companyName,
      logo,
      banner,
      aboutUs,
      organizationType,
      industryType,
      teamSize,
      yearOfEstablishment,
      companyWebsite,
      companyVision,
      socialMedias,
      mapLocation,
      phone,
      email,
    }
  ) {
    return await this.findByIdAndUpdate(
      id,
      removeUndefinedInObject({
        companyName,
        logo,
        banner,
        aboutUs,
        organizationType,
        industryType,
        teamSize,
        yearOfEstablishment,
        companyWebsite,
        companyVision,
        socialMedias,
        mapLocation,
        phone,
        email,
      }),
      { new: true }
    );
  }

  async createCompany({
    companyName,
    logo,
    banner,
    user,
    aboutUs,
    organizationType,
    industryType,
    teamSize,
    yearOfEstablishment,
    companyWebsite,
    companyVision,
    socialMedias,
    mapLocation,
    phone,
    email,
  }) {
    return await this.create({
      _id: user,
      companyName,
      user,
      logo,
      banner,
      aboutUs,
      organizationType,
      industryType,
      teamSize,
      yearOfEstablishment,
      companyWebsite,
      companyVision,
      socialMedias,
      mapLocation,
      phone,
      email,
    });
  }
}

module.exports = new CompanyRepo();
