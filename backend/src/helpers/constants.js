const HEADER = {
  API_KEY: "x-api-key",
  CLIENT_ID: "x-client-id",
  AUTHORIZATION: "authorization",
  REFRESHTOKEN: "x-rtoken-id",
};

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
  EMPTY: "",
  MALE: "male",
  FEMALE: "female",
  UNDEFINED: "undefined",
};

const OrganizationTypes = {
  EMPTY: "",
  PUBLIC: "Public",
  PRIVATE: "Private",
  NONPROFIT: "Non-Profit",
  GOVERNMENT: "Government",
  PARTNERSHIP: "Partnership",
  SOLEPROPRIETORSHIP: "Sole Proprietorship",
  CORPORATION: "Corporation",
};

const IndustryTypes = {
  EMPTY: "",
  TECHNOLOGY: "Technology",
  FINANCE: "Finance",
  HEALTHCARE: "Healthcare",
  MANUFACTURING: "Manufacturing",
  RETAIL: "Retail",
  EDUCATION: "Education",
  REALESTATE: "Real Estate",
  HOSPITALITY: "Hospitality",
  CONSULTING: "Consulting",
  TRANSPORTATION: "Transportation",
};

const TeamSizes = {
  EMPTY: "",
  "1TO10": "1-10",
  "11TO50": "11-50",
  "51TO200": "51-200",
  "201TO500": "201-500",
  "501TO1000": "501-1000",
  "1001TO5000": "1001-5000",
  "5001TO10000": "5001-10000",
  "10001PLUS": "10001+",
};

const JobRoles = {
  EMPTY: "",
  SOFTWAREENGINEER: "Software Engineer",
  DATASCIENTIST: "Data Scientist",
  PRODUCTMANAGER: "Product Manager",
  UXDESIGNER: "UX Designer",
  DEVOPSENGINEER: "DevOps Engineer",
  OTHERS: "Others",
};

const SalaryTypes = {
  EMPTY: "",
  HOUR: "Hour",
  WEEK: "Week",
  MONTH: "Month",
  YEAR: "Year",
};

const Experiences = {
  EMPTY: "",
  INTERN: "Intern",
  FRESHER: "Fresher",
  "1TO2YEARS": "1-2 Years",
  "2TO4YEARS": "2-4 Years",
  "4TO6YEARS": "4-6 Years",
  "6TO8YEARS": "6-8 Years",
  "8TO10YEARS": "8-10 Years",
  "10TO15YEARS": "10-15 Years",
  "15PLUSYEARS": "15+ Years",
};

const JobTypes = {
  FULLTIME: "Full Time",
  PARTTIME: "Part Time",
  INTERNSHIP: "Internship",
  REMOTE: "Remote",
  TEMPORARY: "Temporary",
  CONTRACTBASE: "Contract Base",
};

const JobStatuses = {
  PENDING: "pending",
  ACTIVE: "active",
  REVOKED: "revoked",
  EXPIRED: "expired",
};

const Educations = {
  HIGHSCHOOL: "High School",
  INTERMEDIATE: "Intermediate",
  GRADUATION: "Graduation",
  MASTERDEGREE: "Master Degree",
  BACHELORDEGREE: "Bachelor Degree",
};

const JobLevels = {
  ENTRYLEVEL: "Entry Level",
  MIDLEVEL: "Mid Level",
  EXPERTLEVEL: "Expert Level",
};

const ApplyJobOns = {
  WEBSITE: "website",
  EXTERNAL_PLATFORM: "external_platform",
  EMAIL: "email",
};

const MaritalStatus = {
  EMPTY: "",
  SINGLE: "Single",
  MARRIED: "Married",
  DIVORCED: "Divorced",
  WIDOWED: "Widowed",
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
  OrganizationTypes,
  IndustryTypes,
  TeamSizes,
  JobRoles,
  SalaryTypes,
  Experiences,
  JobTypes,
  Educations,
  JobLevels,
  ApplyJobOns,
  MaritalStatus,
  JobStatuses,
  HEADER,
};
