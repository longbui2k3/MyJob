"use strict";

const companyRepo = require("../models/repos/company.repo");

class CompanyService {
  static createCompany = async (
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
  ) => {
    return await companyRepo.createCompany(
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
    );
  };
}

module.exports = CompanyService;
