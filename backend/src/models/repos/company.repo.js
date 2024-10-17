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
      company_name,
      user,
      // about_us,
      // year_of_establishment,
      // company_website,
      // company_vision,
      // map_location,
      // email,
    },
    files
  ) {
    // const logoImg = await this.uploadFile("image", files["logo_img"][0]);
    // const bannerImg = await this.uploadFile("image", files["banner_img"][0]);

    return await this.create({
      _id: user,
      company_name,
      user,
      // logo_img: logoImg,
      // banner_img: bannerImg,
      // about_us,
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
