const { JobStatuses, UserType, UserStatus } = require("../helpers/constants");
const applicationModel = require("../models/application.model");
const companyModel = require("../models/company.model");
const jobModel = require("../models/job.model");
const applicationRepo = require("../models/repos/application.repo");
const companyRepo = require("../models/repos/company.repo");
const jobRepo = require("../models/repos/job.repo");
const userRepo = require("../models/repos/user.repo");
const userModel = require("../models/user.model");
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
      candidatesNum,
      companiesNum,
      applicationsNum,
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
      userModel.aggregate([
        {
          $match: {
            status: UserStatus.ACTIVE,
            userType: UserType.EMPLOYEE,
          },
        },
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
      companyModel.aggregate([
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
      applicationModel.aggregate([
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
      jobsNum: [JobStatuses.ACTIVE, JobStatuses.EXPIRED].map((val) => {
        const jobs = jobsNum.find((jobs) => jobs._id === val);
        if (jobs) {
          return jobs.count;
        }
        return 0;
      }),
      candidatesNum: new Array(12).fill(0).map((i, val) => {
        const users = candidatesNum.find((users) => users._id === val + 1);
        if (users) {
          return users.count;
        }
        return 0;
      }),
      companiesNum: new Array(12).fill(0).map((i, val) => {
        const companies = companiesNum.find(
          (companies) => companies._id === val + 1
        );
        if (companies) {
          return companies.count;
        }
        return 0;
      }),
      applicationsNum: new Array(12).fill(0).map((i, val) => {
        const applications = applicationsNum.find(
          (applications) => applications._id === val + 1
        );
        if (applications) {
          return applications.count;
        }
        return 0;
      }),
    };
  };
}

module.exports = GeneralService;
