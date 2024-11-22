const resumeModel = require("../resume.model");
const BaseRepo = require("./base.repo");

class ResumeRepo extends BaseRepo {
  constructor() {
    super(resumeModel);
  }
}

module.exports = new ResumeRepo();
