const BaseRepo = require("./baseRepo");
const jobModel = require("../job.model");
const { removeUndefinedInObject } = require("../../utils");

class JobRepo extends BaseRepo {
  constructor() {
    super(jobModel);
  }

  async updateJob(
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
  ) {
    return await this.findByIdAndUpdate(
      id,
      removeUndefinedInObject({
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
      })
    );
  }

  async createJob({
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
  }) {
    return await this.create({
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
  }
}

module.exports = new JobRepo();
