"use strict";

const companyRepo = require("../models/repos/company.repo");

class CompanyService {
  static createCompany = async (
    {
      company_name,
      about_us,
      user,
      year_of_establishment,
      company_website,
      company_vision,
      map_location,
      email,
    },
    files
  ) => {
    return await companyRepo.createCompany(
      {
        company_name,
        about_us,
        user,
        year_of_establishment,
        company_website,
        company_vision,
        map_location,
        email,
      },
      files
    );
  };
}

module.exports = CompanyService;
