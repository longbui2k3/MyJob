const { OK, CREATED } = require("../core/success.response");
const ResumeService = require("../services/resume.service");

class ResumeController {
  constructor() {}

  createUploadedResume = async (req, res, next) => {
    const result = await ResumeService.createUploadedResume(
      req.user.userId,
      req.body,
      req.file
    );

    return new CREATED({
      message: "Create profile successfully",
      metadata: {
        resume: result,
      },
    }).send(res);
  };

  findResumes = async (req, res, next) => {
    const result = await ResumeService.findResumes(req.query);
    return new OK({
      message: "Get resumes successfully",
      metadata: {
        resumes: result.data,
        meta: result.meta,
      },
    }).send(res);
  };

  findResumeById = async (req, res, next) => {
    const result = await ResumeService.findResumeById(req.params.id);

    return new OK({
      message: "Get resume by id successfully",
      metadata: {
        resume: result,
      },
    }).send(res);
  };

  updateResume = async (req, res, next) => {
    const result = await ResumeService.updateResume(
      req.user.userId,
      req.params.id,
      req.body,
      req.file
    );

    return new OK({
      message: "Update resume successfully",
      metadata: {
        resume: result,
      },
    }).send(res);
  };

  deleteResume = async (req, res, next) => {
    const result = await ResumeService.deleteResume(
      req.user.userId,
      req.params.id
    );

    return new OK({
      message: "Delete resume successfully",
      metadata: {},
    }).send(res);
  };
}
module.exports = new ResumeController();
