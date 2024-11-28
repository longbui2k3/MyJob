"use strict";

const { BadRequestError } = require("../core/error.response");
const profileRepo = require("../models/repos/profile.repo");
const { removeUndefinedInObject } = require("../utils");
const UploadFiles = require("../utils/uploadFiles");

class ProfileService {
  static updateProfile = async (userId, body, file) => {
    const {
      fullName,
      title,
      experience,
      education,
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
    let parseSocialMedias = [];
    if (socialMedias) {
      parseSocialMedias = JSON.parse(socialMedias);
    }
    parseSocialMedias = parseSocialMedias.map((socialMedia) => {
      if (typeof socialMedia === "string") return JSON.parse(socialMedia);
      return socialMedia;
    });
    return await profileRepo.updateProfile(
      userId,
      removeUndefinedInObject({
        avatar,
        ...body,
        socialMedias: socialMedias ? parseSocialMedias : undefined,
      })
    );
  };

  static findProfileByUserId = async (userId) => {
    const profile = await profileRepo.findOne({
      user: userId,
    });

    return profile;
  };

  static findProfiles = async ({ page, limit }) => {
    return profileRepo.find({}, { page, limit });
  };

  static findProfile = async (id) => {
    const profile = profileRepo.findById(id);
    if (!profile) {
      throw new BadRequestError(`Profile with ${id} not found!`);
    }
    return profile;
  };
}

module.exports = ProfileService;
