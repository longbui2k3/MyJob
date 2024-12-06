const Email = require("../utils/email");

class GeneralService {
  static sendEmail = async (from, { toList, subject, html }) => {
    await Email.sendEmail({ from, toList, subject, html });
  };
}

module.exports = GeneralService;
