"use strict";

const { BadRequestError } = require("../core/error.response");
const savedCandidateRepo = require("../models/repos/savedCandidate.repo");

class SavedCandidateService {
  static findSavedCandidate = async (userId, profileId) => {
    const savedCandidate = await savedCandidateRepo.findOne({
      user: userId,
      candidate: profileId,
    });
    if (!savedCandidate) {
      throw new BadRequestError(
        "The candidate has been selected as saved already"
      );
    }
    return savedCandidate;
  };

  static savedCandidate = async (userId, profileId) => {
    const savedCandidate = await savedCandidateRepo.findOne({
      user: userId,
      candidate: profileId,
    });
    if (savedCandidate) {
      throw new BadRequestError(
        "The candidate has been selected as saved already"
      );
    }
    return await savedCandidateRepo.create({
      user: userId,
      candidate: profileId,
    });
  };

  static unsavedCandidate = async (userId, profileId) => {
    const savedCandidate = await savedCandidateRepo.findOne({
      user: userId,
      candidate: profileId,
    });
    if (!savedCandidate) {
      throw new BadRequestError(
        "The candidate hasn't been selected as saved yet"
      );
    }
    return await savedCandidateRepo.deleteOne({
      user: userId,
      candidate: profileId,
    });
  };
}

module.exports = SavedCandidateService;
