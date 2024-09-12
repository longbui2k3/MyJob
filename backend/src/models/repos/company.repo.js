const companyModel = require("../company.model");
const BaseRepo = require("./baseRepo");

class CompanyRepo extends BaseRepo {
  constructor() {
    super(companyModel);
  }

  async createCompany({
    logo_img,
    banner_img,
    company_name,
    about_us,
    user,
    year_of_establishment,
    company_website,
    company_vision,
    map_location,
    email,
  }) {
    return await this.create({
      logo_img,
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
