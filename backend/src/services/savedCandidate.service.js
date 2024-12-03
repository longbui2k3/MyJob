"use strict";

const { BadRequestError } = require("../core/error.response");
const savedCandidateRepo = require("../models/repos/savedCandidate.repo");

class SavedCandidateService {
  static findSavedCandidate = async (userId, applicationId) => {
    const savedCandidate = await savedCandidateRepo.findOne({
      user: userId,
      candidate: applicationId,
    });
    if (!savedCandidate) {
      throw new BadRequestError(
        "The candidate has been selected as saved already"
      );
    }
    return savedCandidate;
  };

  static savedCandidate = async (userId, applicationId) => {
    const savedCandidate = await savedCandidateRepo.findOne({
      user: userId,
      candidate: applicationId,
    });
    if (savedCandidate) {
      throw new BadRequestError(
        "The candidate has been selected as saved already"
      );
    }
    return await savedCandidateRepo.create({
      user: userId,
      candidate: applicationId,
    });
  };

  static unsavedCandidate = async (userId, applicationId) => {
    const savedCandidate = await savedCandidateRepo.findOne({
      user: userId,
      candidate: applicationId,
    });
    if (!savedCandidate) {
      throw new BadRequestError(
        "The candidate hasn't been selected as saved yet"
      );
    }
    return await savedCandidateRepo.deleteOne({
      user: userId,
      candidate: applicationId,
    });
  };
}

module.exports = SavedCandidateService;
