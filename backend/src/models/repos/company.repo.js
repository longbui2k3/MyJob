const companyModel = require("../company.model");
const BaseRepo = require("./base.repo");
const UploadFiles = require("../../utils/uploadFiles");

class CompanyRepo extends BaseRepo {
  constructor() {
    super(companyModel);
  }

  async findCompanyByUser(user_id) {
    return await this.findOne({ user: user_id });
  }

  async createCompany(
    {
      companyName,
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
    },
    files
  ) {
    const logoImg = await this.uploadFile("image", files["logo"][0]);
    const bannerImg = await this.uploadFile("image", files["banner"][0]);

    return await this.create({
      _id: user,
      companyName,
      user,
      logo: logoImg,
      banner: bannerImg,
      aboutUs,
      organizationType,
      industryType,
      teamSize,
      yearOfEstablishment,
      companyWebsite,
      companyVision,
      socialMedias: JSON.parse(socialMedias),
      mapLocation,
      phone,
      email,
    });
  }
  async uploadFile(type, file) {
    return await new UploadFiles(
      "company",
      type,
      file
    ).uploadFileAndDownloadURL();
  }
}

module.exports = new CompanyRepo();
