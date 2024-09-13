"use strict";

const { SuccessResponse } = require("../core/success.response");
const CompanyService = require("../services/company.service");

class CompanyController {
  createCompany = async (req, res, next) => {
    new SuccessResponse({
      message: "Create company success",
      metadata: await CompanyService.createCompany(
        {
          ...req.body,
          user: req.user.userId,
          email: req.user.email,
        },
        req.file
      ),
    }).send(res);
  };
}

module.exports = new CompanyController();
