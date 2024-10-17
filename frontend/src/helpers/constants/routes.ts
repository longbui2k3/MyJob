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
export const FIND_EMPLOYERS_KEY = "FIND_EMPLOYERS";

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
        isPrivate: false,

      },
      {
        key: FIND_EMPLOYERS_KEY,
        name: "Find Employers",
        path: "/employers/:id",
        isPrivate: false,
      },
      {
        key: DASHBOARD_KEY,
        name: "Dashboard",
        path: "/dashboard/:type",
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
    return findRouteByKey(key, route["children"]);
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
