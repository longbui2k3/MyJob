const HEADER = {
  API_KEY: "x-api-key",
  CLIENT_ID: "x-client-id",
  AUTHORIZATION: "authorization",
  REFRESHTOKEN: "x-rtoken-id",
};

const UserStatus = {
  UNVERIFIED: "unverified",
  // PENDING: "pending",
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

const UserGenders = {
  EMPTY: "",
  MALE: "Male",
  FEMALE: "Female",
  UNDEFINED: "Undefined",
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
  "5001PLUS": "5001+",
};

const JobRoles = {
  EMPTY: "",
  SOFTWAREENGINEER: "Software Engineer",
  DATASCIENTIST: "Data Scientist",
  PRODUCTMANAGER: "Product Manager",
  UXDESIGNER: "UX Designer",
  DEVOPSENGINEER: "DevOps Engineer",
  DIGITALMARKETING: "Digital Marketing",
  FINANCIALANALYST: "Financial Analyst",
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
  JUNIOR: "Junior",
  MIDDLE: "Middle",
  SENIOR: "Senior",
  LEADER: "Leader",
  MANAGER: "Manager",
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
  //PENDING: "Pending",
  ACTIVE: "Active",
  //REVOKED: "Revoked",
  EXPIRED: "Expired",
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

const ResumeTypes = {
  CREATED_RESUME: "created_resume",
  UPLOADED_RESUME: "uploaded_resume",
};

const ApplicationStatuses = {
  SUBMITTED: "Submitted",
  CONSIDER: "Consider",
  INTERVIEW: "Interview",
  HIRED: "Hired",
  REJECTED: "Rejected",
};

module.exports = {
  PAGE: 1,
  LIMIT: 20,
  OTP_LENGTH: 6,
  OTP_EXPIRES: 15 * 60, // 15 minutes
  PASSWORD_RESET_EXPIRES: 10 * 60 * 1000,
  ACCESS_TOKEN_EXPIRES: 1000 * 60 * 60 * 2, // 2h
  REFRESH_TOKEN_EXPIRES: "7 days",
  UserStatus,
  UserRole,
  UserType,
  UserGenders,
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
  ResumeTypes,
  ApplicationStatuses,
};
