"use strict";

const { BadRequestError } = require("../core/error.response");
const applicationRepo = require("../models/repos/application.repo");
const jobRepo = require("../models/repos/job.repo");
const resumeRepo = require("../models/repos/resume.repo");
const userRepo = require("../models/repos/user.repo");
class ApplicationService {
  static createApplication = async (
    userId,
    { job: jobId, resume: resumeId, coverLetter }
  ) => {
    const user = await userRepo.findById(userId);
    if (!user) {
      throw new BadRequestError("User not found!");
    }

    const job = await jobRepo.findById(jobId);
    if (!job) {
      throw new BadRequestError("Job not found!");
    }

    if (new Date(job.expirationDate) < new Date(Date.now())) {
      throw new BadRequestError(
        "Job has expired! Please apply for another job!"
      );
    }

    const resume = await resumeRepo.findById(resumeId);
    if (!resume) {
      throw new BadRequestError("Resume not found!");
    }

    const application = await applicationRepo.create({
      user: userId,
      job: jobId,
      resume: resumeId,
      coverLetter,
    });
    return application;
  };
}

module.exports = ApplicationService;
