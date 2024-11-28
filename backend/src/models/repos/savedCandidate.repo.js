const savedcandidateModel = require("../savedcandidate.model");
const BaseRepo = require("./base.repo");

class SavedCandidateRepo extends BaseRepo {
  constructor() {
    super(savedcandidateModel);
  }
}

module.exports = new SavedCandidateRepo();
