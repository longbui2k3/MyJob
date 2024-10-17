"use strict";

const { CREATED } = require("../core/success.response");
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
}

module.exports = new CompanyController();
