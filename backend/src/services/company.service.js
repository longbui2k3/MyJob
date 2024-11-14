"use strict";

const userRepo = require("../models/repos/user.repo");
const companyRepo = require("../models/repos/company.repo");
const UploadFiles = require("../utils/uploadFiles");
const { BadRequestError } = require("../core/error.response");
const jobRepo = require("../models/repos/job.repo");

class CompanyService {
  static getMyCompany = async (userId) => {
    return await companyRepo.findCompanyByUser(userId);
  };
  static deleteCompany = async (id) => {
    const checkCompanyExists = await companyRepo.findCompanyById(id);
    if (!checkCompanyExists) {
      throw new BadRequestError(`Company with id ${id} is not found!`);
    }
    await jobRepo.deleteJobsByCompanyId(id);
    return await companyRepo.deleteCompany(id);
  };

  static updateCompany = async (id, data, files) => {
    const { socialMedias, ...otherData } = data;

    const [logoImg, bannerImg] = await Promise.all([
      this.uploadFile(files?.logo?.[0]),
      this.uploadFile(files?.banner?.[0]),
    ]);
    let parseSocialMedias = [];
    if (socialMedias) {
      parseSocialMedias = JSON.parse(socialMedias);
    }
    parseSocialMedias = parseSocialMedias.map((socialMedia) => {
      if (typeof socialMedia === "string") return JSON.parse(socialMedia);
      return socialMedia;
    });
    const updateCompany = await companyRepo.updateCompany(id, {
      ...otherData,
      logo: logoImg,
      banner: bannerImg,
      socialMedias: socialMedias ? parseSocialMedias : undefined,
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
    let { socialMedias, ...otherData } = data;
    const [logoImg, bannerImg] = await Promise.all([
      this.uploadFile(files?.logo?.[0]),
      this.uploadFile(files?.banner?.[0]),
    ]);
    let parseSocialMedias = [];
    if (socialMedias) {
      parseSocialMedias = JSON.parse(socialMedias);
    }
    parseSocialMedias = parseSocialMedias.map((socialMedia) => {
      if (typeof socialMedia === "string") return JSON.parse(socialMedia);
      return socialMedia;
    });
    return await companyRepo.createCompany({
      ...otherData,
      logo: logoImg,
      banner: bannerImg,
      socialMedias: parseSocialMedias,
    });
  };

  static async uploadFile(file) {
    return await new UploadFiles(
      "company",
      "image",
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
