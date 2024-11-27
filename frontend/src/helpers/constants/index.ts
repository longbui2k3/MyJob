export { UserTypes, ViewTypes, HttpMethods } from "./enums";
export type {
  UserTypeKeys,
  UserTypeValues,
  HttpMethodsKeys,
  HttpMethodsValues,
} from "./enums";
export { Navigations } from "./commons";

export {
  getRoute,
  getBreadcrumb,
  matchPathPattern,
  DASHBOARD_KEY,
  DEFAULT_KEY,
  FORGOT_PASSWORD_KEY,
  HOME_KEY,
  RESET_PASSWORD_KEY,
  SIGN_IN_KEY,
  SIGN_UP_KEY,
  VERIFY_KEY,
  FIND_JOBS_KEY,
  FIND_EMPLOYERS_KEY,
  MY_CV_KEY,
  FIND_CANDIDATES_KEY,
  CANDIDATE_DETAIL_KEY,
  FIND_APPLICATIONS_KEY,
  APPLICATION_DETAIL_KEY,
  COMPANY_KEY,
  CREATE_COMPANY_KEY,
  COMPLETED_COMPANY_KEY,
  DASHBOARD_OVERVIEW_KEY,
  DASHBOARD_APPLIED_JOBS_KEY,
  DASHBOARD_FAVORITE_JOBS_KEY,
  DASHBOARD_JOB_ALERT_KEY,
  DASHBOARD_SETTINGS_KEY,
  DASHBOARD_EMPLOYERS_PROFILE_KEY,
  DASHBOARD_POST_A_JOB_KEY,
  DASHBOARD_MY_JOBS_KEY,
  DASHBOARD_SAVED_CANDIDATE_KEY,
  DASHBOARD_PLANS_AND_BILLING_KEY,
  DASHBOARD_CATEGORIES_KEY,
  DASHBOARD_APPLICATIONS_KEY,
  DASHBOARD_EDIT_JOB_KEY,
  EMPLOYER_DETAIL_KEY,
  JOB_DETAIL_KEY,
} from "./routes";
export type { RouteItem } from "./routes";
export const DEFAULT_PADDING_X = "200px";
export const Experiences = [
  "Intern",
  "Fresher",
  "Junior",
  "Middle",
  "Senior",
  "Leader",
  "Manager",
];
export const JobRoles = [
  "Software Engineer",
  "Data Scientist",
  "Product Manager",
  "UX Designer",
  "DevOps Engineer",
  "Digital Marketing",
  "Financial Analyst",
  "Others",
];

export const Salaries = [
  { label: "$50 - $1000", from: 50, to: 1000 },
  { label: "$1000 - $2000", from: 1000, to: 2000 },
  { label: "$2000 - $3000", from: 2000, to: 3000 },
  { label: "$3000 - $4000", from: 3000, to: 4000 },
  { label: "$4000 - $6000", from: 4000, to: 6000 },
  { label: "$6000 - $8000", from: 6000, to: 8000 },
  { label: "$8000 - $10000", from: 8000, to: 10000 },
  { label: "$10000 - $15000", from: 10000, to: 15000 },
  { label: "$15000+", from: 15000, to: null },
];

export const SalaryTypes = ["Hour", "Week", "Month", "Year"];

export const JobTypes = [
  "Full Time",
  "Part Time",
  "Internship",
  "Remote",
  "Temporary",
  "Contract Base",
];

export const Educations = [
  "High School",
  "Intermediate",
  "Graduation",
  "Master Degree",
  "Bachelor Degree",
];

export const OrganizationTypes = [
  "Public",
  "Private",
  "Non-Profit",
  "Government",
  "Partnership",
  "Sole Proprietorship",
  "Corporation",
];

export const IndustryTypes = [
  "Technology",
  "Finance",
  "Healthcare",
  "Manufacturing",
  "Retail",
  "Education",
  "Real Estate",
  "Hospitality",
  "Consulting",
  "Transportation",
];

export const TeamSizes = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "501-1000",
  "1001-5000",
  "5001+",
];

export const JobLevels = ["Entry Level", "Mid Level", "Expert Level"];

export const UserGenders = ["Male", "Female", "Undefined"];

export const MaritalStatus = ["Single", "Married", "Divorced", "Widowed"];

export const JobStatuses = {
  ACTIVE: "Active",
  EXPIRED: "Expired",
};
