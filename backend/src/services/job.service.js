"use strict";

const jobRepo = require("../models/repos/job.repo");

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

  static createJob = async ({
    jobTitle,
    category,
    company,
    createdBy,
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
  }) => {
    return await jobRepo.createJob({
      jobTitle,
      category,
      company,
      createdBy,
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
}

module.exports = JobService;
