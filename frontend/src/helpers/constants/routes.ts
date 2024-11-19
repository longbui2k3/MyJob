export interface RouteItem {
  key: string;
  name: string;
  path: string;
  isPrivate: boolean;
  children?: Array<RouteItem>;
}

//PATH_KEY
export const SIGN_IN_KEY = "SIGN_IN";
export const SIGN_UP_KEY = "SIGN_UP";
export const VERIFY_KEY = "VERIFY";
export const FORGOT_PASSWORD_KEY = "FORGOT_PASSWORD";
export const RESET_PASSWORD_KEY = "RESET_PASSWORD";
export const DEFAULT_KEY = "__";
export const HOME_KEY = "HOME";
export const DASHBOARD_KEY = "DASHBOARD";
export const FIND_JOBS_KEY = "FIND_JOBS";
export const JOB_DETAIL_KEY = "JOB_DETAIL";
export const FIND_EMPLOYERS_KEY = "FIND_EMPLOYERS";
export const COMPANY_KEY = "COMPANY";
export const CREATE_COMPANY_KEY = "CREATE_COMPANY";
export const COMPLETED_COMPANY_KEY = "COMPLETED_COMPANY";
export const DASHBOARD_OVERVIEW_KEY = "DASHBOARD_OVERVIEW";
export const DASHBOARD_APPLIED_JOBS_KEY = "DASHBOARD_APPLIED_JOBS";
export const DASHBOARD_FAVORITE_JOBS_KEY = "DASHBOARD_FAVORITE_JOBS";
export const DASHBOARD_JOB_ALERT_KEY = "DASHBOARD_JOB_ALERT";
export const DASHBOARD_SETTINGS_KEY = "DASHBOARD_SETTINGS";
export const DASHBOARD_EMPLOYERS_PROFILE_KEY = "DASHBOARD_EMPLOYERS_PROFILE";
export const DASHBOARD_POST_A_JOB_KEY = "DASHBOARD_POST_A_JOB";
export const DASHBOARD_MY_JOBS_KEY = "DASHBOARD_MY_JOBS";
export const DASHBOARD_SAVED_CANDIDATE_KEY = "DASHBOARD_SAVED_CANDIDATE";
export const DASHBOARD_PLANS_AND_BILLING_KEY = "DASHBOARD_PLANS_AND_BILLING";
export const DASHBOARD_CATEGORIES_KEY = "DASHBOARD_CATEGORIES";

const ROUTES: Array<RouteItem> = [
  {
    key: SIGN_IN_KEY,
    name: "Sign In",
    path: "/signin",
    isPrivate: false,
  },
  {
    key: SIGN_UP_KEY,
    name: "Sign Up",
    path: "/signup",
    isPrivate: false,
  },
  {
    key: VERIFY_KEY,
    name: "Verify Code",
    path: "/verify",
    isPrivate: false,
  },
  {
    key: FORGOT_PASSWORD_KEY,
    name: "Forgot Password",
    path: "/forgotpassword",
    isPrivate: false,
  },
  {
    key: RESET_PASSWORD_KEY,
    name: "Reset Password",
    path: "/resetpassword/:token",
    isPrivate: false,
  },
  {
    key: DEFAULT_KEY,
    name: "Home",
    path: "/",
    isPrivate: false,
    children: [
      {
        key: HOME_KEY,
        name: "Home",
        path: "/home",
        isPrivate: false,
      },
      {
        key: FIND_JOBS_KEY,
        name: "Find Jobs",
        path: "/jobs",
        children: [
          {
            key: JOB_DETAIL_KEY,
            name: "Job Detail",
            path: "/jobs/:id",
            isPrivate: false,
          },
        ],
        isPrivate: false,
      },
      {
        key: FIND_EMPLOYERS_KEY,
        name: "Find Employers",
        path: "/employers",
        isPrivate: false,
      },
      {
        key: COMPANY_KEY,
        name: "Company",
        path: "/company",
        children: [
          {
            key: CREATE_COMPANY_KEY,
            name: "Create Company",
            path: "/company/create",
            isPrivate: true,
          },
          {
            key: COMPLETED_COMPANY_KEY,
            name: "Completed Company",
            path: "/company/completed",
            isPrivate: false,
          },
        ],
        isPrivate: false,
      },
      {
        key: DASHBOARD_KEY,
        name: "Dashboard",
        path: "/dashboard",
        children: [
          {
            key: DASHBOARD_OVERVIEW_KEY,
            name: "Dashboard Overview",
            path: "/dashboard/overview",
            isPrivate: true,
          },
          {
            key: DASHBOARD_APPLIED_JOBS_KEY,
            name: "Dashboard Applied Jobs",
            path: "/dashboard/applied-jobs",
            isPrivate: true,
          },
          {
            key: DASHBOARD_FAVORITE_JOBS_KEY,
            name: "Dashboard Favorite Jobs",
            path: "/dashboard/favorite-jobs",
            isPrivate: true,
          },
          {
            key: DASHBOARD_JOB_ALERT_KEY,
            name: "Dashboard Job Alert",
            path: "/dashboard/job-alert",
            isPrivate: true,
          },
          {
            key: DASHBOARD_SETTINGS_KEY,
            name: "Dashboard Settings",
            path: "/dashboard/settings",
            isPrivate: true,
          },
          {
            key: DASHBOARD_EMPLOYERS_PROFILE_KEY,
            name: "Dashboard Employers Profile",
            path: "/dashboard/employers-profile",
            isPrivate: true,
          },
          {
            key: DASHBOARD_POST_A_JOB_KEY,
            name: "Dashboard Post A Job",
            path: "/dashboard/post-a-job",
            isPrivate: true,
          },
          {
            key: DASHBOARD_MY_JOBS_KEY,
            name: "Dashboard My Jobs ",
            path: "/dashboard/my-jobs",
            isPrivate: true,
          },
          {
            key: DASHBOARD_SAVED_CANDIDATE_KEY,
            name: "Dashboard Saved Candidate",
            path: "/dashboard/saved-candidate",
            isPrivate: true,
          },
          {
            key: DASHBOARD_PLANS_AND_BILLING_KEY,
            name: "Dashboard Plans And Billing",
            path: "/dashboard/plans-and-billing",
            isPrivate: true,
          },
          {
            key: DASHBOARD_CATEGORIES_KEY,
            name: "Dashboard Categories",
            path: "/dashboard/categories",
            isPrivate: true,
          },
        ],
        isPrivate: true,
      },
    ],
  },
];

const DEFAULT_ROUTE = {
  key: DEFAULT_KEY,
  name: "Home",
  path: "/",
  isPrivate: false,
};

export const getRoute = (
  key: string,
  options?: {
    query?: { [key: string]: string };
    param?: { [key: string]: string };
  }
): RouteItem => {
  const route = findRouteByKey(key, ROUTES) || DEFAULT_ROUTE;

  let queryString = "";
  if (options && options.query)
    queryString = ((obj: { [key: string]: string }) => {
      const queryString =
        "?" +
        Object.entries(obj)
          .map(([key, value]) => `${key}=${value}`)
          .join("&");
      return queryString;
    })(options.query);
  route.path = route.path + queryString;

  if (options && options.param) {
    Object.entries(options.param).forEach(([key, value]) => {
      route.path = route.path.replace(`:${key}`, value);
    });
  }
  return route;
};

export const matchPathPattern = (path: string, pattern: string) => {
  const pathParts = path.split("/");
  const patternParts = pattern.split("/");

  if (pathParts.length !== patternParts.length) {
    return false;
  }

  const length = pathParts.length;
  for (let i = 0; i < length; i++) {
    if (patternParts[i].startsWith(":")) {
      continue;
    }
    if (pathParts[i] !== patternParts[i]) {
      return false;
    }
  }
  return true;
};

let selectedRoutes: Array<RouteItem> = [];
let resRoutes: Array<RouteItem> = [];
export const getBreadcrumb = (key: string) => {
  resRoutes = [];
  selectedRoutes = [];
  getBreadcrumbBacktrack(key, ROUTES, selectedRoutes);
  return resRoutes;
};

const findRouteByKey = (
  key: string,
  routes: Array<RouteItem>
): RouteItem | undefined => {
  for (const route of routes) {
    if (route["key"] === key) {
      return {
        key: route["key"],
        name: route["name"],
        path: route["path"],
        isPrivate: route["isPrivate"],
      };
    }
    if (!route["children"]) {
      continue;
    }
    const childRoute = findRouteByKey(key, route["children"]);
    if (childRoute) {
      return childRoute;
    }
  }
  return undefined;
};

const getBreadcrumbBacktrack = (
  key: string,
  routes: Array<RouteItem>,
  selectedRoutes: Array<RouteItem>
) => {
  for (const route of routes) {
    selectedRoutes = [...selectedRoutes, route];
    if (route["key"] === key) {
      resRoutes = selectedRoutes;
      return;
    }
    if (route["children"]) {
      getBreadcrumbBacktrack(key, route["children"], selectedRoutes);
    }
    selectedRoutes = selectedRoutes.slice(0, -1);
  }
};
