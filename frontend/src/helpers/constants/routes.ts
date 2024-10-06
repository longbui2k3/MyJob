interface RouteItem {
  key: string;
  name: string;
  path: string;
  isPrivate: boolean;
  children?: Array<RouteItem>;
}

const ROUTES: Array<RouteItem> = [
  {
    key: "SIGN_IN",
    name: "Sign In",
    path: "/signin",
    isPrivate: false,
  },
  {
    key: "SIGN_UP",
    name: "Sign Up",
    path: "/signup",
    isPrivate: false,
  },
  {
    key: "VERIFY",
    name: "Verify Code",
    path: "/verify",
    isPrivate: false,
  },
  {
    key: "FORGOT_PASSWORD",
    name: "Forgot Password",
    path: "/forgotpassword",
    isPrivate: false,
  },
  {
    key: "RESET_PASSWORD",
    name: "Reset Password",
    path: "/resetpassword/:token",
    isPrivate: false,
  },
  {
    key: "__",
    name: "Home",
    path: "/",
    isPrivate: false,
    children: [
      {
        key: "HOME",
        name: "Home",
        path: "/home",
        isPrivate: false,
      },
    ],
  },
];

const __ = (key: string, routes: Array<RouteItem>): RouteItem | undefined => {
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
    return __(key, route["children"]);
  }
  return undefined;
};

export const getRoute = (
  key: string,
  options: {
    query?: { [key: string]: string };
    param?: { [key: string]: string };
  }
): RouteItem => {
  const route = __(key, ROUTES) || {
    key: "__",
    name: "Home",
    path: "/",
    isPrivate: false,
  };
  return route;
};
