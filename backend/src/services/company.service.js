"use strict";

const companyRepo = require("../models/repos/company.repo");

class CompanyService {
  static createCompany = async (
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
  ) => {
    return await companyRepo.createCompany(
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
    );
  };
}

module.exports = CompanyService;
