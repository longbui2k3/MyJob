const OTPGenerator = require("otp-generator");
module.exports = function generateOTP(length) {
  const OTP = OTPGenerator.generate(length, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  return OTP;
};
