const companyModel = require("../company.model");
const BaseRepo = require("./baseRepo");
const { removeUndefinedInObject } = require("../../utils");

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
