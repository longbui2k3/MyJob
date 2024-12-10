const { JobStatuses, UserType } = require("../helpers/constants");
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
    const [openJobs, candidates, companies, applications] = await Promise.all([
      jobRepo.countDocuments({ status: JobStatuses.ACTIVE }),
      userRepo.countDocuments({ userType: UserType.EMPLOYEE }),
      companyRepo.countDocuments({}),
      applicationRepo.countDocuments({}),
    ]);

    return {
      openJobs,
      candidates,
      companies,
      applications,
    };
  };
}

module.exports = GeneralService;
