import { DASHBOARD_KEY, DEFAULT_KEY, getRoute, HOME_KEY } from "./routes";

export const Navigations = {
  HOME: {
    label: "Home",
    href: getRoute(DEFAULT_KEY).path,
    pattern1: getRoute(HOME_KEY).path,
    pattern: getRoute(DEFAULT_KEY).path,
  },
  FIND_JOB: {
    label: "Find Job",
    href: "#",
    pattern: "#",
  },
  EMPLOYERS: {
    label: "Employers",
    href: "#",
    pattern: "#",
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
    href: "#",
    pattern: "#",
  },
  DASHBOARD: {
    label: "Dashboard",
    href: getRoute(DASHBOARD_KEY, {
      param: {
        type: "overview",
      },
    }).path,
    pattern: getRoute(DASHBOARD_KEY).path,
  },
  JOB_ALERTS: {
    label: "Job Alerts",
    href: "#",
    pattern: "#",
  },
  FIND_CANDIDATES: {
    label: "Find Candidates",
    href: "#",
    pattern: "#",
  },
  MY_JOBS: {
    label: "My Jobs",
    href: "#",
    pattern: "#",
  },
  APPLICATIONS: {
    label: "Applications",
    href: "#",
    pattern: "#",
  },
  DASHBOARD_OVERVIEW: {
    label: "Overview",
    href: getRoute(DASHBOARD_KEY, {
      param: {
        type: "overview",
      },
    }).path,
    pattern: getRoute(DASHBOARD_KEY).path,
  },
  DASHBOARD_APPLIED_JOBS: {
    label: "Applied Jobs",
    href: getRoute(DASHBOARD_KEY, {
      param: {
        type: "applied-jobs",
      },
    }).path,
    pattern: getRoute(DASHBOARD_KEY).path,
  },
  DASHBOARD_FAVORITE_JOBS: {
    label: "Favorite Jobs",
    href: getRoute(DASHBOARD_KEY, {
      param: {
        type: "favorite-jobs",
      },
    }).path,
    pattern: getRoute(DASHBOARD_KEY).path,
  },
  DASHBOARD_JOB_ALERT: {
    label: "Job Alert",
    href: getRoute(DASHBOARD_KEY, {
      param: {
        type: "job-alert",
      },
    }).path,
    pattern: getRoute(DASHBOARD_KEY).path,
  },
  DASHBOARD_SETTINGS: {
    label: "Settings",
    href: getRoute(DASHBOARD_KEY, {
      param: {
        type: "settings",
      },
    }).path,
    pattern: getRoute(DASHBOARD_KEY).path,
  },
  DASHBOARD_EMPLOYERS_PROFILE: {
    label: "Employers Profile",
    href: getRoute(DASHBOARD_KEY, {
      param: {
        type: "employers-profile",
      },
    }).path,
    pattern: getRoute(DASHBOARD_KEY).path,
  },
  DASHBOARD_POST_A_JOB: {
    label: "Post a Job",
    href: getRoute(DASHBOARD_KEY, {
      param: {
        type: "post-a-job",
      },
    }).path,
    pattern: getRoute(DASHBOARD_KEY).path,
  },
  DASHBOARD_MY_JOBS: {
    label: "My Jobs",
    href: getRoute(DASHBOARD_KEY, {
      param: {
        type: "my-jobs",
      },
    }).path,
    pattern: getRoute(DASHBOARD_KEY).path,
  },
  DASHBOARD_SAVED_CANDIDATE: {
    label: "Saved Candidate",
    href: getRoute(DASHBOARD_KEY, {
      param: {
        type: "saved-candidate",
      },
    }).path,
    pattern: getRoute(DASHBOARD_KEY).path,
  },
  DASHBOARD_PLANS_AND_BILLING: {
    label: "Plans & Billing",
    href: getRoute(DASHBOARD_KEY, {
      param: {
        type: "plans-and-billing",
      },
    }).path,
    pattern: getRoute(DASHBOARD_KEY).path,
  },
};
