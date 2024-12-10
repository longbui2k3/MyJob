"use strict";

const { BadRequestError } = require("../core/error.response");
const applicationRepo = require("../models/repos/application.repo");
const jobRepo = require("../models/repos/job.repo");
const resumeRepo = require("../models/repos/resume.repo");
const userRepo = require("../models/repos/user.repo");
const profileRepo = require("../models/repos/profile.repo");
const { removeUndefinedInObject } = require("../utils");
const companyRepo = require("../models/repos/company.repo");
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
      company: job.company._id,
      resume: resumeId,
      coverLetter,
    });
    return application;
  };

  static findApplications = async (userId, { job, page, limit, status }) => {
    const user = await userRepo.findById(userId);
    if (!user) {
      throw new BadRequestError("User not found!");
    }
    const company = await companyRepo.findOne({
      user: userId,
    });
    if (!company) {
      throw new BadRequestError("Company not found!");
    }

    return await applicationRepo.find(
      removeUndefinedInObject({ job, company: company._id, status }),
      {
        page,
        limit,
        sort: ["createdAt"],
        populates: ["profile", "job", "resume.resume"],
        populateSelects: [
          {
            profile:
              "avatar fullName provinceCode experience title education email",
          },
        ],
      }
    );
  };

  static updateApplication = async (id, data) => {
    const update = await applicationRepo.findByIdAndUpdate(
      id,
      removeUndefinedInObject(data),
      { new: true }
    );
    if (!update) throw BadRequestError(`Application with ${id} not found!`);
    return update;
  };

  static findApplication = async (applicationId) => {
    const application = await applicationRepo.findById(applicationId, {
      populates: ["profile", "resume", "resume.resume", "job", "user"],
    });
    return application;
  };
}

module.exports = ApplicationService;
