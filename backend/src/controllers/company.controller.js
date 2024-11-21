"use strict";

const { CREATED, OK } = require("../core/success.response");
const CompanyService = require("../services/company.service");

class CompanyController {
  getMyCompany = async (req, res, next) => {
    const result = await CompanyService.getMyCompany(req.user.userId);

    return new OK({
      message: "Get my company successfully",
      metadata: result,
    }).send(res);
  };
  delteteCompany = async (req, res, next) => {
    const result = await CompanyService.deleteCompany(req.params.id);
    return new OK({
      message: "Delete company successfully!",
      metadata: result,
    }).send(res);
  };
  updateCompany = async (req, res, next) => {
    const result = await CompanyService.updateCompany(
      req.params.id,
      req.body,
      req.files
    );
    return new OK({
      message: "Update company successfully!",
      metadata: result,
    }).send(res);
  };

  createCompany = async (req, res, next) => {
    const result = await CompanyService.createCompany(
      {
        ...req.body,
        user: req.user.userId,
      },
      req.files
    );
    return new CREATED({
      message: "Create company successfully!",
      metadata: result,
    }).send(res);
  };

  findCompanies = async (req, res, next) => {
    const result = await CompanyService.findCompanies(req.query);
    return new OK({
      message: "Find companies successfully",
      metadata: {
        companies: result.data,
        meta: result.meta,
      },
    }).send(res);
  };

  findCompany = async (req, res, next) => {
    const result = await CompanyService.findCompany(req.params.id);
    return new OK({
      message: "Find company successfully",
      metadata: {
        company: result,
      },
    }).send(res);
  };
}

module.exports = new CompanyController();
