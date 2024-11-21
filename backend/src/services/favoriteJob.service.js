"use strict";

const { BadRequestError } = require("../core/error.response");
const favoriteJobRepo = require("../models/repos/favoriteJob.repo");

class FavoriteJobService {
  static findFavoriteJob = async (userId, jobId) => {
    const favoriteJob = await favoriteJobRepo.findOne({
      user: userId,
      job: jobId,
    });
    if (!favoriteJob) {
      throw new BadRequestError(
        "The job has been selected as favorite already"
      );
    }
    return favoriteJob;
  };
  static favoriteJob = async (userId, jobId) => {
    const favoriteJob = await favoriteJobRepo.findOne({
      user: userId,
      job: jobId,
    });
    if (favoriteJob) {
      throw new BadRequestError(
        "The job has been selected as favorite already"
      );
    }
    return await favoriteJobRepo.create({
      user: userId,
      job: jobId,
    });
  };

  static unfavoriteJob = async (userId, jobId) => {
    const favoriteJob = await favoriteJobRepo.findOne({
      user: userId,
      job: jobId,
    });
    if (!favoriteJob) {
      throw new BadRequestError("The job hasn't been selected as favorite yet");
    }
    return await favoriteJobRepo.deleteOne({
      user: userId,
      job: jobId,
    });
  };
}

module.exports = FavoriteJobService;
