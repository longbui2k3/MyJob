const UserStatus = {
  UNVERIFIED: "unverified",
  PENDING: "pending",
  ACTIVE: "active",
  INACTIVE: "inactive",
};

const UserRole = {
  USER: "user",
  ADMIN: "admin",
};

const UserType = {
  EMPLOYEE: "employee",
  EMPLOYER: "employer",
};

const UserGender = {
  MALE: "male",
  FEMALE: "female",
  UNDEFINED: "undefined",
};

module.exports = {
  PAGE: 1,
  LIMIT: 20,
  OTP_LENGTH: 6,
  OTP_EXPIRES: 10 * 60 * 1000,
  PASSWORD_RESET_EXPIRES: 10 * 60 * 1000,
  ACCESS_TOKEN_EXPIRES: 1000 * 60 * 60 * 2, // 2h
  REFRESH_TOKEN_EXPIRES: "7 days",
  UserStatus,
  UserRole,
  UserType,
  UserGender,
};
