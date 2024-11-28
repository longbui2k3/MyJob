const created_resumeModel = require("../created_resume.model");
const BaseRepo = require("./base.repo");

class CreatedResumeRepo extends BaseRepo {
  constructor() {
    super(created_resumeModel);
  }
}

module.exports = new CreatedResumeRepo();
