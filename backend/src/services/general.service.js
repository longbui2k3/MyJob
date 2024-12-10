const { JobStatuses, UserType } = require("../helpers/constants");
const jobModel = require("../models/job.model");
const applicationRepo = require("../models/repos/application.repo");
const companyRepo = require("../models/repos/company.repo");
const jobRepo = require("../models/repos/job.repo");
const userRepo = require("../models/repos/user.repo");
const Email = require("../utils/email");

class GeneralService {
  static sendEmail = async (from, { toList, subject, html }) => {
    await Email.sendEmail({ from, toList, subject, html });
  };
  static generalStatistics = async () => {
    const [
      openJobs,
      candidates,
      companies,
      applications,
      createdJobsByMonthNum,
      jobsNum,
    ] = await Promise.all([
      jobRepo.countDocuments({ status: JobStatuses.ACTIVE }),
      userRepo.countDocuments({ userType: UserType.EMPLOYEE }),
      companyRepo.countDocuments({}),
      applicationRepo.countDocuments({}),
      jobModel.aggregate([
        {
          $group: {
            _id: { $month: "$createdAt" },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ]),
      jobModel.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ]),
    ]);

    return {
      openJobs,
      candidates,
      companies,
      applications,
      createdJobsByMonthNum: new Array(12).fill(0).map((i, val) => {
        const jobs = createdJobsByMonthNum.find((jobs) => jobs._id === val + 1);
        if (jobs) {
          return jobs.count;
        }
        return 0;
      }),
      jobsNum: jobsNum.map((jobs) => jobs.count),
    };
  };
}

module.exports = GeneralService;
