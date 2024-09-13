const companyModel = require("../company.model");
const BaseRepo = require("./baseRepo");
const UploadFiles = require("../../utils/uploadFiles");

class CompanyRepo extends BaseRepo {
  constructor() {
    super(companyModel);
  }

  async createCompany(
    {
      banner_img,
      company_name,
      about_us,
      user,
      year_of_establishment,
      company_website,
      company_vision,
      map_location,
      email,
    },
    file
  ) {
    const image = await new UploadFiles(
      "company",
      "image",
      file
    ).uploadFileAndDownloadURL();
    return await this.create({
      _id: user,
      logo_img: image,
      banner_img,
      company_name,
      about_us,
      user,
      year_of_establishment,
      company_website,
      company_vision,
      map_location,
      email,
    });
  }
}

module.exports = new CompanyRepo();
