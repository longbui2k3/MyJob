"use strict";

const userRepo = require("../models/repos/user.repo");
const { UserType } = require("../helpers/constants");
const companyRepo = require("../models/repos/company.repo");
const UploadFiles = require("../utils/uploadFiles");
const { BadRequestError } = require("../core/error.response");

class CompanyService {
  static getMyCompany = async (userId) => {
    return await companyRepo.findCompanyByUser(userId);
  };

  static updateCompany = async (
    id,
    {
      companyName,
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
    const checkCompanyExists = await companyRepo.findCompanyByUser(id);
    if (!checkCompanyExists) {
      throw new BadRequestError(`Company with id ${id} is not found!`);
    }

    const logoFile = Array.isArray(files["logo"])
      ? files["logo"][0]
      : files["logo"];
    const bannerFile = Array.isArray(files["banner"])
      ? files["banner"][0]
      : files["banner"];

    const logoImg = await this.uploadFile("image", logoFile);
    const bannerImg = await this.uploadFile("image", bannerFile);

    console.log(files);

    if (socialMedias) {
      socialMedias = JSON.parse(socialMedias);
    }
    return await companyRepo.updateCompany(id, {
      companyName,
      logo: logoImg,
      banner: bannerImg,
      aboutUs,
      organizationType,
      industryType,
      teamSize,
      yearOfEstablishment,
      companyWebsite,
      companyVision,
      socialMedias: socialMedias,
      mapLocation,
      phone,
      email,
    });
  };

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
    const logoImg = await this.uploadFile("image", files["logo"][0]);
    const bannerImg = await this.uploadFile("image", files["banner"][0]);
    return await companyRepo.createCompany({
      companyName,
      logo: logoImg,
      banner: bannerImg,
      user,
      aboutUs,
      organizationType,
      industryType,
      teamSize,
      yearOfEstablishment,
      companyWebsite,
      companyVision,
      socialMedias: JSON.parse(socialMedias),
      mapLocation,
      phone,
      email,
    });
  };

  static async uploadFile(type, file) {
    return await new UploadFiles(
      "company",
      type,
      file
    ).uploadFileAndDownloadURL();
  }
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
