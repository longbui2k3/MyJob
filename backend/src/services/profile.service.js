"use strict";

const profileRepo = require("../models/repos/profile.repo");
const { removeUndefinedInObject } = require("../utils");
const UploadFiles = require("../utils/uploadFiles");

class ProfileService {
  static updateProfile = async (userId, body, file) => {
    const {
      fullName,
      title,
      experience,
      educations,
      personalWebsite,
      mobile,
      mapLocation,
      gender,
      nationality,
      dateOfBirth,
      maritalStatus,
      biography,
      address,
      socialMedias,
      isPrivacy,
    } = body;

    const avatar = await new UploadFiles(
      "profiles",
      "image",
      file
    ).uploadFileAndDownloadURL();
    return await profileRepo.updateProfile(
      userId,
      removeUndefinedInObject({ avatar, ...body })
    );
  };
}

module.exports = ProfileService;
