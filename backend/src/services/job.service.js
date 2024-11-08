const jobRepo = require("../models/repos/job.repo");

class JobService {
  static findJobs = async ({ page, limit, search, ...props }) => {
    return await jobRepo.find(
      {},
      {
        page,
        limit,
        search,
      }
    );
  };
}

module.exports = JobService;
