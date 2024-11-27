"use strict";

const { BadRequestError } = require("../core/error.response");
const applicationRepo = require("../models/repos/application.repo");
const jobRepo = require("../models/repos/job.repo");
const resumeRepo = require("../models/repos/resume.repo");
const userRepo = require("../models/repos/user.repo");
const profileRepo = require("../models/repos/profile.repo");
const { removeUndefinedInObject } = require("../utils");
class ApplicationService {
  static createApplication = async (
    userId,
    { job: jobId, resume: resumeId, coverLetter }
  ) => {
    const user = await userRepo.findById(userId);
    if (!user) {
      throw new BadRequestError("User not found!");
    }
    const profile = await profileRepo.findProfileByUser(userId);
    if (!profile) {
      throw new BadRequestError("Profile not found!");
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
      profile: profile._id,
      job: jobId,
      resume: resumeId,
      coverLetter,
    });
    return application;
  };

  static findApplications = async ({ job, page, limit }) => {
    return await applicationRepo.find(removeUndefinedInObject({ job }), {
      page,
      limit,
      sort: ["createdAt"],
      populates: ["profile"],
      populateSelects: [
        {
          profile: "avatar fullName",
        },
      ],
    });
  };
}

module.exports = ApplicationService;
