"use strict";

const companyRepo = require("../models/repos/company.repo");

class CompanyService {
  static createCompany = async (
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
  ) => {
    return await companyRepo.createCompany(
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
    );
  };
}

module.exports = CompanyService;
