"use strict";

const companyRepo = require("../models/repos/company.repo");

class CompanyService {
  static createCompany = async (
    {
      companyName,
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
        companyName,
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
