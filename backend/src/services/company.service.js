"use strict";

const companyRepo = require("../models/repos/company.repo");
const UploadFiles = require("../utils/uploadFiles");
const { BadRequestError } = require("../core/error.response");
const jobRepo = require("../models/repos/job.repo");
const { removeUndefinedInObject } = require("../utils");
const { OrganizationTypes } = require("../helpers/constants");

class CompanyService {
  static deleteCompany = async (id) => {
    const checkCompanyExists = await companyRepo.findCompanyById(id);
    if (!checkCompanyExists) {
      throw new BadRequestError(`Company with id ${id} is not found!`);
    }
    await jobRepo.deleteJobsByCompanyId(id);
    return await companyRepo.deleteCompany(id);
  };

  static updateCompany = async (id, data, files) => {
    const { socialMedias, provinceCode, ...otherData } = data;

    const logoImg = await this.uploadFile(files?.logo?.[0]);
    const bannerImg = await this.uploadFile(files?.banner?.[0]);

    // let parseSocialMedias = [];
    // if (socialMedias) {
    //   parseSocialMedias = JSON.parse(socialMedias);
    // }
    // parseSocialMedias = parseSocialMedias.map((socialMedia) => {
    //   if (typeof socialMedia === "string") return JSON.parse(socialMedia);
    //   return socialMedia;
    // });
    let parseSocialMedias;
    if (socialMedias) {
      parseSocialMedias = JSON.parse(socialMedias);
    }
    const updateCompany = await companyRepo.updateCompany(id, {
      ...otherData,
      logo: logoImg,
      banner: bannerImg,
      socialMedias: parseSocialMedias,
      provinceCode: provinceCode ? Number(provinceCode) : undefined,
    });

    if (!updateCompany)
      throw new BadRequestError(`Company with id ${id} is not found!`);

    await jobRepo.updateCompanyForJob(id, {
      companyName: updateCompany.companyName,
      logo: updateCompany.logo,
      mapLocation: updateCompany.mapLocation,
      provinceCode: updateCompany.provinceCode,
    });
    return updateCompany;
  };

  static createCompany = async (data, files) => {
    let { socialMedias, provinceCode, ...otherData } = data;
    const logoImg = await this.uploadFile(files?.logo?.[0]);
    const bannerImg = await this.uploadFile(files?.banner?.[0]);

    // let parseSocialMedias = [];
    // if (socialMedias) {
    //   parseSocialMedias = JSON.parse(socialMedias);
    // }
    // parseSocialMedias = parseSocialMedias.map((socialMedia) => {
    //   if (typeof socialMedia === "string") return JSON.parse(socialMedia);
    //   return socialMedia;
    // });
    let parseSocialMedias;
    if (socialMedias) {
      parseSocialMedias = JSON.parse(socialMedias);
    }
    return await companyRepo.createCompany({
      ...otherData,
      logo: logoImg,
      banner: bannerImg,
      socialMedias: parseSocialMedias,
      provinceCode: Number(provinceCode),
    });
  };

  static async uploadFile(file) {
    return await new UploadFiles(
      "company",
      "image",
      file
    ).uploadFileAndDownloadURL();
  }
  static findCompanies = async ({
    page,
    limit,
    search,
    provinceCode = 0,
    organizationType,
  }) => {
    organizationType = Object.values(OrganizationTypes)[organizationType];
    return await companyRepo.find(
      removeUndefinedInObject({
        provinceCode: provinceCode - 0 || undefined,
        organizationType,
      }),
      {
        page,
        limit,
        search,
        sort: ["-openPositionNum"],
      }
    );
  };

  static findCompany = async (id) => {
    const company = await companyRepo.findById(id);
    if (!company) {
      throw new Error("Company not found!");
    }
    return company;
  };
}

module.exports = CompanyService;
