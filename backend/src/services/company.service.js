"use strict";

const companyRepo = require("../models/repos/company.repo");

class CompanyService {
  static createCompany = async (
    {
      companyName,
      user,
      aboutUs,
      organizationType,
      industryType,
      teamSize,
      yearOfEstablishment,
      companyWebsite,
      companyVision,
      socialMedias,
      mapLocation,
      phone,
      email,
    },
    files
  ) => {
    return await companyRepo.createCompany(
      {
        companyName,
        user,
        aboutUs,
        organizationType,
        industryType,
        teamSize,
        yearOfEstablishment,
        companyWebsite,
        companyVision,
        socialMedias,
        mapLocation,
        phone,
        email,
      },
      files
    );
  };

  static findCompanies = async ({ page, limit, search, ...props }) => {
    return await companyRepo.find(
      {},
      {
        page, 
        limit,
        search,
      }
    );
  };
}

module.exports = CompanyService;
