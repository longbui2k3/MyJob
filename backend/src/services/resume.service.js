"use strict";

const { BadRequestError } = require("../core/error.response");
const { ResumeTypes } = require("../helpers/constants");
const uploadedResumeRepo = require("../models/repos/uploadedResume.repo");
const userRepo = require("../models/repos/user.repo");
const resumeRepo = require("../models/repos/resume.repo");
const UploadFiles = require("../utils/uploadFiles");
const { removeUndefinedInObject } = require("../utils");
class ResumeService {
  static createUploadedResume = async (userId, { name }, file) => {
    const user = await userRepo.findById(userId);
    if (!user) {
      throw new BadRequestError("User not found!");
    }

    if (!file) throw new BadRequestError("File not found!");

    let fileUrl = undefined;
    if (file) {
      fileUrl = await new UploadFiles(
        "resumes",
        "documents",
        file
      ).uploadFileAndDownloadURL();
    }

    const uploadedResume = await uploadedResumeRepo.create({
      fileUrl,
    });

    const resume = await resumeRepo.create({
      user: userId,
      name,
      type: ResumeTypes.UPLOADED_RESUME,
      resume: uploadedResume._id,
    });

    return resume;
  };

  static findResumes = async ({
    user: userId,
    type = ResumeTypes.UPLOADED_RESUME,
    page = 1,
    limit = 6,
  }) => {
    if (userId) {
      const user = await userRepo.findById(userId);
      if (!user) {
        throw new BadRequestError("User not found!");
      }
    }

    const uploadedResumes = await resumeRepo.find(
      removeUndefinedInObject({ user: userId, type }),
      {
        page,
        limit,
        populates: ["resume"],
      }
    );
    for (let i = 0; i < uploadedResumes.data.length; i++) {
      uploadedResumes.data[i].file_size = (
        (
          await new UploadFiles().getFileInfo(
            uploadedResumes.data[i].resume.fileUrl
          )
        ).size / 1024
      ).toFixed(1);
    }
    return uploadedResumes;
  };

  static findResumeById = async (resumeId) => {
    const resume = await resumeRepo.findById(resumeId, {
      populates: ["resume"],
    });
    if (!resume) {
      throw new BadRequestError("Resume not found!");
    }

    return resume;
  };

  static updateResume = async (userId, resumeId, { name }, file) => {
    const user = await userRepo.findById(userId);
    if (!user) {
      throw new BadRequestError("User not found!");
    }

    const resume = await resumeRepo.findById(resumeId);
    if (!resume) {
      throw new BadRequestError("Resume not found!");
    }

    let fileUrl = undefined;
    if (file) {
      fileUrl = await new UploadFiles(
        "resumes",
        "documents",
        file
      ).uploadFileAndDownloadURL();
    }

    const uploadedResume = await uploadedResumeRepo.findByIdAndUpdate(
      resume.resume,
      removeUndefinedInObject({ fileUrl })
    );

    const updatedResume = await resumeRepo.findByIdAndUpdate(
      resumeId,
      removeUndefinedInObject({
        name,
      })
    );

    return updatedResume;
  };

  static deleteResume = async (userId, resumeId) => {
    const user = await userRepo.findById(userId);
    if (!user) {
      throw new BadRequestError("User not found!");
    }

    const resume = await resumeRepo.findById(resumeId);
    if (!resume) {
      throw new BadRequestError("Resume not found!");
    }

    await uploadedResumeRepo.deleteOne({ _id: resume.resume });

    await resumeRepo.deleteOne({ _id: resumeId });

    return {};
  };
}

module.exports = ResumeService;
