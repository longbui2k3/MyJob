const uploaded_resumeModel = require("../uploaded_resume.model");
const BaseRepo = require("./base.repo");

class UploadedResumeRepo extends BaseRepo {
  constructor() {
    super(uploaded_resumeModel);
  }
}

module.exports = new UploadedResumeRepo();
