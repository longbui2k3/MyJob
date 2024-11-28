const { OK } = require("../core/success.response");
const SavedCandidateService = require("../services/savedCandidate.service");

class SavedCandidateController {
  constructor() {}

  findSavedCandidate = async (req, res, next) => {
    const result = await SavedCandidateService.findSavedCandidate(
      req.user.userId,
      req.params.profileId
    );

    return new OK({
      message: "Find saved candidate successfully",
      metadata: {
        savedCandidate: result,
      },
    }).send(res);
  };

  savedCandidate = async (req, res, next) => {
    const result = await SavedCandidateService.savedCandidate(
      req.user.userId,
      req.params.profileId
    );

    return new OK({
      message: "Saved candidate successfully",
      metadata: {
        savedCandidate: result,
      },
    }).send(res);
  };

  unfavoriteJob = async (req, res, next) => {
    const result = await SavedCandidateService.unsavedCandidate(
      req.user.userId,
      req.params.profileId
    );

    return new OK({
      message: "Unsaved candidate successfully",
      metadata: {},
    }).send(res);
  };
}
module.exports = new SavedCandidateController();
