"use strict";

const jobRepo = require("../models/repos/job.repo");
const companyRepo = require("../models/repos/company.repo");
const {
  convertToObjectId,
  removeUndefinedInObject,
  flattenQueryArray,
} = require("../utils");
const { BadRequestError } = require("../core/error.response");
const {
  Experiences,
  Educations,
  JobTypes,
  JobLevels,
} = require("../helpers/constants");
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
    companyId,
    category,
    status,
    experiences = [],
    salaryMin,
    salaryMax,
    educations,
    jobTypes,
    jobLevels,
  }) => {
    experiences = flattenQueryArray(experiences);
    educations = flattenQueryArray(educations);
    jobTypes = flattenQueryArray(jobTypes);
    jobLevels = flattenQueryArray(jobLevels);
    experiences = experiences.map(
      (experience) => Object.values(Experiences)[experience]
    );
    educations = educations.map(
      (education) => Object.values(Educations)[education]
    );
    jobTypes = jobTypes.map((jobType) => Object.values(JobTypes)[jobType]);
    jobLevels = jobLevels.map((jobLevel) => Object.values(JobLevels)[jobLevel]);
    salaryMin = salaryMin ? Number(salaryMin) : undefined;
    salaryMax = salaryMax ? Number(salaryMax) : undefined;
    await jobRepo.updateExpiredJobs();
    const job = await jobRepo.find(
      removeUndefinedInObject({
        "company.provinceCode": provinceCode - 0 || undefined,
        "company._id": companyId || undefined,
        category,
        status,
        experience: experiences.length
          ? {
              $in: experiences,
            }
          : undefined,
        education: educations.length
          ? {
              $in: educations,
            }
          : undefined,
        jobType: jobTypes.length
          ? {
              $in: jobTypes,
            }
          : undefined,
        jobLevel: jobLevels.length
          ? {
              $in: jobLevels,
            }
          : undefined,
        minSalary:
          salaryMin !== undefined
            ? {
                $gte: salaryMin,
              }
            : undefined,
        maxSalary:
          salaryMax !== undefined
            ? {
                $lte: salaryMax,
              }
            : undefined,
      }),
      {
        page,
        limit,
        search,
        sort: ["-createdAt"],
        populates: ["category"],
        populateSelects: [
          {
            category: "name",
          },
        ],
        populateMatches: [],
      }
    );
    return job;
  };

  static findJob = async (id) => {
    const job = await jobRepo.findById(id);
    if (!job) {
      throw new BadRequestError("Job not found!");
    }
    const company = await companyRepo.findById(job.company._id, {
      unselect: ["banner", "aboutUs", "companyVision", "user"],
    });
    job.company = company;
    return job;
  };
}

module.exports = JobService;
