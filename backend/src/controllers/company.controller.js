"use strict";

const { CREATED, OK } = require("../core/success.response");
const CompanyService = require("../services/company.service");

class CompanyController {
  createCompany = async (req, res, next) => {
    const result = await CompanyService.createCompany(
      {
        ...req.body,
        user: req.user.userId,
        email: req.user.email,
      },
      req.files
    );
    return new CREATED(result).send(res);
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
}

module.exports = new CompanyController();
