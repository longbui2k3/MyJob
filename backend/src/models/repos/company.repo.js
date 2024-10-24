const companyModel = require("../company.model");
const BaseRepo = require("./baseRepo");
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
      // year_of_establishment,
      // company_website,
      // company_vision,
      // map_location,
      // email,
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
      // year_of_establishment,
      // company_website,
      // company_vision,
      // map_location,
      // email,
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
