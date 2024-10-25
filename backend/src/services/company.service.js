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
}

module.exports = CompanyService;
