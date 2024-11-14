const { CREATED, OK } = require("../core/success.response");
const JobService = require("../services/job.service");

class JobController {
  constructor() {}

  findJobs = async (req, res, next) => {
    const result = await JobService.findJobs(req.query);

    return new OK({
      message: "Find jobs successfully",
      metadata: {
        jobs: result.data,
        meta: result.meta,
      },
    }).send(res);
  };
  deleteJob = async (req, res, next) => {
    const result = await JobService.deleteJob(req.params.id);

    return new OK({
      message: "Delete job successfully!",
      metadata: result,
    }).send(res);
  };

  updateJob = async (req, res, next) => {
    const result = await JobService.updateJob(req.params.id);

    return new OK({
      message: "Update job successfully!",
      metadata: result,
    }).send(res);
  };

  createJob = async (req, res, next) => {
    const result = await JobService.createJob(req.user.userId, req.body);

    return new CREATED({
      message: "Create job successfully!",
      metadata: result,
    }).send(res);
  };
}
module.exports = new JobController();
