const { OK } = require("../core/success.response");
const applicationService = require("../services/application.service");

class ApplicationController {
  constructor() {}

  createApplication = async (req, res, next) => {
    const result = await applicationService.createApplication(
      req.user.userId,
      req.body
    );

    return new OK({
      message: "Create application successfully!",
      metadata: {
        application: result,
      },
    }).send(res);
  };

  findApplications = async (req, res, next) => {
    const result = await applicationService.findApplications(
      req.user.userId,
      req.query
    );

    return new OK({
      message: "Find applications successfully",
      metadata: {
        applications: result.data,
        meta: result.meta,
      },
    }).send(res);
  };

  updateApplication = async (req, res, next) => {
    const result = await applicationService.updateApplication(
      req.params.id,
      req.body
    );

    return new OK({
      message: "update application successfully",
      metadata: result,
    }).send(res);
  };

  findApplication = async (req, res, next) => {
    const result = await applicationService.findApplication(req.params.id);

    return new OK({
      message: "Find application successfully",
      metadata: {
        application: result,
      },
    }).send(res);
  };
}
module.exports = new ApplicationController();
