"use strict";

const companyRepo = require("../models/repos/company.repo");
const { convertToObjectId } = require("../utils");

class CompanyService {
  static createCompany = async ({
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
  }) => {
    return await companyRepo.createCompany({
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
  };
}

module.exports = CompanyService;
