"use strict";

const jobRepo = require("../models/repos/job.repo");
const companyRepo = require("../models/repos/company.repo");
const { convertToObjectId, removeUndefinedInObject } = require("../utils");
class JobService {
  static updateJob = async (
    id,
    {
      jobTitle,
      status,
      tags,
      jobRole,
      minSalary,
      maxSalary,
      salaryType,
      education,
      experience,
      jobType,
      vacancies,
      expirationDate,
      jobLevel,
      applyJobOn,
      jobDescription,
      jobResponsibilities,
    }
  ) => {
    return await jobRepo.createJob(id, {
      jobTitle,
      status,
      tags,
      jobRole,
      minSalary,
      maxSalary,
      salaryType,
      education,
      experience,
      jobType,
      vacancies,
      expirationDate,
      jobLevel,
      applyJobOn,
      jobDescription,
      jobResponsibilities,
    });
  };

  static createJob = async (
    userId,
    {
      jobTitle,
      category,
      tags,
      jobRole,
      minSalary,
      maxSalary,
      salaryType,
      education,
      experience,
      jobType,
      vacancies,
      expirationDate,
      jobLevel,
      applyJobOn,
      jobDescription,
      jobResponsibilities,
    }
  ) => {
    const company = await companyRepo.findOne({
      user: convertToObjectId(userId),
    });

    return await jobRepo.createJob({
      jobTitle,
      category,
      company: company._id,
      tags,
      jobRole,
      minSalary,
      maxSalary,
      salaryType,
      education,
      experience,
      jobType,
      vacancies,
      expirationDate,
      jobLevel,
      applyJobOn,
      jobDescription,
      jobResponsibilities,
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
}

module.exports = JobService;
