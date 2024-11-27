import {
  DASHBOARD_APPLIED_JOBS_KEY,
  DASHBOARD_CATEGORIES_KEY,
  DASHBOARD_EMPLOYERS_PROFILE_KEY,
  DASHBOARD_FAVORITE_JOBS_KEY,
  DASHBOARD_JOB_ALERT_KEY,
  DASHBOARD_KEY,
  DASHBOARD_MY_JOBS_KEY,
  DASHBOARD_EDIT_JOB_KEY,
  DASHBOARD_APPLICATIONS_KEY,
  DASHBOARD_OVERVIEW_KEY,
  DASHBOARD_PLANS_AND_BILLING_KEY,
  DASHBOARD_POST_A_JOB_KEY,
  DASHBOARD_SAVED_CANDIDATE_KEY,
  DASHBOARD_SETTINGS_KEY,
  DEFAULT_KEY,
  FIND_EMPLOYERS_KEY,
  MY_CV_KEY,
  FIND_JOBS_KEY,
  getRoute,
  HOME_KEY,
  FIND_CANDIDATES_KEY,
  FIND_APPLICATIONS_KEY,
} from "./routes";

export const Navigations = {
  HOME: {
    label: "Home",
    href: getRoute(DEFAULT_KEY).path,
    pattern1: getRoute(HOME_KEY).path,
    pattern: getRoute(DEFAULT_KEY).path,
  },
  FIND_JOB: {
    label: "Find Jobs",
    href: getRoute(FIND_JOBS_KEY).path,
    pattern: getRoute(FIND_JOBS_KEY).path,
  },
  EMPLOYERS: {
    label: "Employers",
    href: getRoute(FIND_EMPLOYERS_KEY).path,
    pattern: getRoute(FIND_EMPLOYERS_KEY).path,
  },
  CANDIDATES: {
    label: "Candidates",
    href: "#",
    pattern: "#",
  },
  PRICING_PLANS: {
    label: "Pricing Plans",
    href: "#",
    pattern: "#",
  },
  CUSTOMER_SUPPORTS: {
    label: "Customer Supports",
    href: "#",
    pattern: "#",
  },
  FIND_EMPLOYERS: {
    label: "Find Employers",
    href: getRoute(FIND_EMPLOYERS_KEY).path,
    pattern: getRoute(FIND_EMPLOYERS_KEY).path,
  },
  MY_CV: {
    label: "My CV",
    href: getRoute(MY_CV_KEY).path,
    pattern: getRoute(MY_CV_KEY).path,
  },
  DASHBOARD: {
    label: "Dashboard",
    href: getRoute(DASHBOARD_KEY).path,
    pattern: getRoute(DASHBOARD_KEY).path + "/:type",
  },
  JOB_ALERTS: {
    label: "Job Alerts",
    href: "#",
    pattern: "#",
  },
  FIND_CANDIDATES: {
    label: "Find Candidates",
    href: getRoute(FIND_CANDIDATES_KEY).path,
    pattern: getRoute(FIND_CANDIDATES_KEY).path,
  },
  MY_JOBS: {
    label: "My Jobs",
    href: "#",
    pattern: "#",
  },  
  APPLICATIONS: {
    label: "Applications",
    href: getRoute(FIND_APPLICATIONS_KEY).path,
    pattern: getRoute(FIND_APPLICATIONS_KEY).path,
  },
  DASHBOARD_OVERVIEW: {
    label: "Overview",
    href: getRoute(DASHBOARD_OVERVIEW_KEY).path,
    pattern: getRoute(DASHBOARD_KEY).path,
  },
  DASHBOARD_APPLIED_JOBS: {
    label: "Applied Jobs",
    href: getRoute(DASHBOARD_APPLIED_JOBS_KEY).path,
    pattern: getRoute(DASHBOARD_KEY).path,
  },
  DASHBOARD_FAVORITE_JOBS: {
    label: "Favorite Jobs",
    href: getRoute(DASHBOARD_FAVORITE_JOBS_KEY).path,
    pattern: getRoute(DASHBOARD_KEY).path,
  },
  DASHBOARD_JOB_ALERT: {
    label: "Job Alert",
    href: getRoute(DASHBOARD_JOB_ALERT_KEY).path,
    pattern: getRoute(DASHBOARD_KEY).path,
  },
  DASHBOARD_SETTINGS: {
    label: "Settings",
    href: getRoute(DASHBOARD_SETTINGS_KEY).path,
    pattern: getRoute(DASHBOARD_KEY).path,
  },
  DASHBOARD_EMPLOYERS_PROFILE: {
    label: "Employers Profile",
    href: getRoute(DASHBOARD_EMPLOYERS_PROFILE_KEY).path,
    pattern: getRoute(DASHBOARD_KEY).path,
  },
  DASHBOARD_POST_A_JOB: {
    label: "Post a Job",
    href: getRoute(DASHBOARD_POST_A_JOB_KEY).path,
    pattern: getRoute(DASHBOARD_KEY).path,
  },
  DASHBOARD_MY_JOBS: {
    label: "My Jobs",
    href: getRoute(DASHBOARD_MY_JOBS_KEY).path,
    pattern: getRoute(DASHBOARD_KEY).path,
  },
  DASHBOARD_EDIT_JOB: {
    label: "Edit Job",
    href: getRoute(DASHBOARD_EDIT_JOB_KEY).path,
    pattern: getRoute(DASHBOARD_MY_JOBS_KEY).path,
  },
  DASHBOARD_APPLICATIONS: {
    label: "Applications",
    href: getRoute(DASHBOARD_APPLICATIONS_KEY).path,
    pattern: getRoute(DASHBOARD_MY_JOBS_KEY).path,
  },
  DASHBOARD_SAVED_CANDIDATE: {
    label: "Saved Candidate",
    href: getRoute(DASHBOARD_SAVED_CANDIDATE_KEY).path,
    pattern: getRoute(DASHBOARD_KEY).path,
  },
  DASHBOARD_PLANS_AND_BILLING: {
    label: "Plans & Billing",
    href: getRoute(DASHBOARD_PLANS_AND_BILLING_KEY).path,
    pattern: getRoute(DASHBOARD_KEY).path,
  },
  DASHBOARD_CATEGORIES: {
    label: "Categories",
    href: getRoute(DASHBOARD_CATEGORIES_KEY).path,
    pattern: getRoute(DASHBOARD_KEY).path,
  },
};
