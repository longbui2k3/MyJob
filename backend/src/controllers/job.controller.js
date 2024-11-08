const { CREATED, OK } = require("../core/success.response");
const JobService = require("../services/job.service");

class JobController {
  constructor() {}

  updateJob = async (req, res, next) => {
    const result = await JobService.updateJob(req.params.id);

    return new OK({
      message: "Update job successfully!",
      metadata: result,
    }).send(res);
  };

  createJob = async (req, res, next) => {
    const result = await JobService.createJob({
      ...req.body,
      createdBy: req.user.userId,
    });

    return new CREATED({
      message: "Create job successfully!",
      metadata: result,
    }).send(res);
  };
}
module.exports = new JobController();
