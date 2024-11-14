"use strict";

const companyRepo = require("../models/repos/company.repo");
const UploadFiles = require("../utils/uploadFiles");
const { BadRequestError } = require("../core/error.response");

class CompanyService {
  static getMyCompany = async (userId) => {
    return await companyRepo.findCompanyByUser(userId);
  };
  static deleteCompany = async (id) => {
    const checkCompanyExists = await companyRepo.findCompanyById(id);
    if (!checkCompanyExists) {
      throw new BadRequestError(`Company with id ${id} is not found!`);
    }
    return await companyRepo.deleteCompany(id);
  };

  static updateCompany = async (id, data, files) => {
    const { socialMedias, ...otherData } = data;

    const [logoImg, bannerImg] = await Promise.all([
      this.uploadFile(files?.logo?.[0]),
      this.uploadFile(files?.banner?.[0]),
    ]);
    const updateCompany = await companyRepo.updateCompany(id, {
      ...otherData,
      logo: logoImg,
      banner: bannerImg,
      socialMedias: socialMedias ? JSON.parse(socialMedias) : undefined,
    });

    if (!updateCompany)
      throw new BadRequestError(`Company with id ${id} is not found!`);
    return updateCompany;
  };

  static createCompany = async (data, files) => {
    const { socialMedias, ...otherData } = data;
    const [logoImg, bannerImg] = await Promise.all([
      this.uploadFile(files?.logo?.[0]),
      this.uploadFile(files?.banner?.[0]),
    ]);
    return await companyRepo.createCompany({
      ...otherData,
      logo: logoImg,
      banner: bannerImg,
      socialMedias: JSON.parse(socialMedias),
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
