const { JobStatuses } = require("../src/helpers/constants");

module.exports = {
  signUpBodySchema: {
    $name: "Your Name",
    $email: "youremail@gmail.com",
    $password: "string",
    $passwordConfirm: "string",
    $mobile: "string",
  },
  logInBodySchema: {
    $email: "buiduclong911@gmail.com",
    $password: "12345678",
  },
  forgotPasswordBodySchema: {
    $email: "youremail@gmail.com",
  },
  forgotPasswordResponse200Schema: {
    $status: 200,
    $message: "Password reset email sent",
    $metadata: {},
  },
  forgotPasswordResponse400Schema: {
    $status: 400,
    $message: "No account with the supplied email exists!",
  },
  forgotPasswordResponse424Schema: {
    $status: 424,
    $message: "Password reset email failed!",
  },
  resetPasswordBodySchema: {
    $password: "string",
    $passwordConfirm: "string",
  },
  resetPasswordResponse200Schema: {
    $status: 200,
    $message: "Reset password successfully!",
    $metadata: {
      $tokens: {
        $accessToken: "string",
        $refreshToken: "string",
      },
      $user: {
        $_id: "string",
        $name: "string",
        $email: "string",
        $role: "string",
        $typeOfAccount: "string",
        $dateOfBirth: "string",
        $gender: "string",
      },
    },
  },
  resetPasswordResponse400Schema: {
    $status: 400,
    $message: "string",
  },
  resetPasswordResponse401Schema: {
    $status: 401,
    $message: "string",
  },
  resendOTPBodySchema: {
    $email: "string",
  },
  jobBodySchema: {
    $jobTitle: "string",
    $category: "string",
    $tags: [],
    $jobRole: "Software Engineer",
    $minSalary: 0,
    $maxSalary: 0,
    $salaryType: "Month",
    $education: "Graduation",
    $experience: "Fresher",
    $jobType: "Full Time",
    $vacancies: 0,
    $expirationDate: "2024-12-12",
    $jobLevel: "Entry Level",
    $applyJobOn: "website",
    $jobDescription: "string",
    $jobResponsibilities: "string",
  },
  applicationBodySchema: {
    $job: "string",
    $resume: "string",
    $coverLetter: "string",
  },
  sendEmailSchema: {
    $toList: [],
    $subject: "string",
    $html: "string",
  },
};
