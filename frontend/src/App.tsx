import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import {
  Cover,
  PageDashboard,
  PageEmailVerification,
  PageFindJobs,
  PageForgotPassword,
  PageHome,
  PageResetPassword,
  PageSignin,
  PageSignup,
  PageCreateCompany,
  PrivateRoutes,
} from "./pages";
import {
  DASHBOARD_KEY,
  DEFAULT_KEY,
  FIND_EMPLOYERS_KEY,
  FIND_JOBS_KEY,
  FORGOT_PASSWORD_KEY,
  getRoute,
  HOME_KEY,
  RESET_PASSWORD_KEY,
  RouteItem,
  SIGN_IN_KEY,
  SIGN_UP_KEY,
  VERIFY_KEY,
} from "./helpers/constants";
import { useAuthContext } from "./context";
import { CircularProgress } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { PageFindEmployers } from "./pages/home";

const AuthenRoutes = [
  {
    route: getRoute(SIGN_IN_KEY),
    element: <PageSignin />,
  },
  {
    route: getRoute(SIGN_UP_KEY),
    element: <PageSignup />,
  },
  {
    route: getRoute(FORGOT_PASSWORD_KEY),
    element: <PageForgotPassword />,
  },
  {
    route: getRoute(VERIFY_KEY),
    element: <PageEmailVerification />,
  },
  {
    route: getRoute(RESET_PASSWORD_KEY),
    element: <PageResetPassword />,
  },
];

const OtherRoutes = [
  {
    route: getRoute(DEFAULT_KEY),
    element: <PageHome />,
  },
  {
    route: getRoute(HOME_KEY),
    element: <PageHome />,
  },
  {
    route: getRoute(FIND_JOBS_KEY),
    element: <PageFindJobs />,
  },
  {
    route: getRoute(FIND_EMPLOYERS_KEY),
    element: <PageFindEmployers />,
  },
  {
    route: getRoute(DASHBOARD_KEY),
    element: <PageDashboard />,
  },
];

function App() {
  const { user } = useAuthContext();
  const [authenRoutes, setAuthenRoutes] = useState<
    Array<{ route: RouteItem; element: JSX.Element }>
  >([]);
  const [publicRoutes, setPublicRoutes] = useState<
    Array<{ route: RouteItem; element: JSX.Element }>
  >([]);
  const [privateRoutes, setPrivateRoutes] = useState<
    Array<{ route: RouteItem; element: JSX.Element }>
  >([]);

  useEffect(() => {
    setAuthenRoutes(AuthenRoutes);
    setPrivateRoutes(OtherRoutes.filter((route) => route.route.isPrivate));
    setPublicRoutes(OtherRoutes.filter((route) => !route.route.isPrivate));
  }, []);
  if (typeof user === "string")
    return (
      <CircularProgress
        isIndeterminate
        color="var(--primary-500)"
        size="30px"
      />
    );
  return (
    <BrowserRouter>
      <Routes>
        {authenRoutes.map((route) => (
          <Route path={route.route.path} element={route.element} />
        ))}
        <Route path={getRoute(DEFAULT_KEY).path} element={<Cover />}>
          {publicRoutes.map((route) => (
            <Route path={route.route.path} element={route.element} />
          ))}
          <Route path={getRoute(DEFAULT_KEY).path} element={<PrivateRoutes />}>
            {privateRoutes.map((route) => (
              <Route path={route.route.path} element={route.element} />
            ))}
          </Route>
        </Route>

        <Route
          path={getRoute("COMPANY").path}
          element={<PageCreateCompany />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
