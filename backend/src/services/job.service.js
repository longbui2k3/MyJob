"use strict";

const jobRepo = require("../models/repos/job.repo");
const companyRepo = require("../models/repos/company.repo");
const { convertToObjectId, removeUndefinedInObject } = require("../utils");
const { BadRequestError } = require("../core/error.response");
const jobModel = require("../models/job.model");
class JobService {
  static deleteJob = async (id) => {
    const checkJobExists = await jobRepo.findJobById(id);
    if (!checkJobExists) {
      throw new BadRequestError(`Job with id ${id} is not found!`);
    }
    return await jobRepo.deleteJob(id);
  };
  static updateJob = async (id, data) => {
    const updateJob = await jobRepo.updateJob(id, data);
    if (!updateJob)
      throw new BadRequestError(`Job with id ${id} is not found!`);
    return updateJob;
  };

  static createJob = async (userId, data) => {
    const company = await companyRepo.findOne({
      user: convertToObjectId(userId),
    });
    if (!company) throw new BadRequestError("Company not found!");

    return await jobRepo.createJob({
      ...data,
      company: {
        _id: company._id,
        logo: company.logo,
        companyName: company.companyName,
        mapLocation: company.mapLocation,
        provinceCode: company.provinceCode,
      },
    });
  };

  static findJobs = async ({
    page,
    limit,
    search,
    provinceCode = 0,
    category,
    experiences,
    ...props
  }) => {
    experiences = experiences.map(
      (experience) =>
        experience[0].toUpperCase() + experience.slice(1).toLowerCase()
    );
    return await jobRepo.find(
      removeUndefinedInObject({
        "company.provinceCode": provinceCode - 0 || undefined,
        category,
        experience: {
          $in: experiences,
        },
      }),
      {
        page,
        limit,
        search,
        sort: ["createdAt"],
        populates: ["category"],
        populateSelects: [
          {
            category: "name",
          },
        ],
        populateMatches: [],
      }
    );
  };

  static findJobsByCompany = async (userId, { page, limit, status }) => {
    const company = await companyRepo.findOne({
      user: convertToObjectId(userId),
    });
    if (!company) throw new BadRequestError("Company not found!");
    await jobRepo.updateExpiredJobs();
    return await jobRepo.find(
      removeUndefinedInObject({ "company._id": company._id, status }),
      {
        page,
        limit,
        sort: ["createdAt"],
      }
    );
  };
}

module.exports = JobService;
