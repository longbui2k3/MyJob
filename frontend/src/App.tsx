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
  PageFindEmployers,
  PageMyCV,
  PageJobDetail,
  PageEmployerDetail,
  PageCreateCV,
} from "./pages";
import {
  CREATE_COMPANY_KEY,
  COMPLETED_COMPANY_KEY,
  DASHBOARD_CATEGORIES_KEY,
  DASHBOARD_KEY,
  DASHBOARD_OVERVIEW_KEY,
  DASHBOARD_SETTINGS_KEY,
  DEFAULT_KEY,
  FIND_EMPLOYERS_KEY,
  FIND_JOBS_KEY,
  MY_CV_KEY,
  FORGOT_PASSWORD_KEY,
  getRoute,
  HOME_KEY,
  RESET_PASSWORD_KEY,
  RouteItem,
  SIGN_IN_KEY,
  SIGN_UP_KEY,
  VERIFY_KEY,
  DASHBOARD_POST_A_JOB_KEY,
  DASHBOARD_MY_JOBS_KEY,
  JOB_DETAIL_KEY,
  EMPLOYER_DETAIL_KEY,
  DASHBOARD_EDIT_JOB_KEY,
  DASHBOARD_APPLICATIONS_KEY,
  DASHBOARD_SAVED_CANDIDATE_KEY,
  DASHBOARD_APPLIED_JOBS_KEY,
  DASHBOARD_FAVORITE_JOBS_KEY,
  DASHBOARD_USERS_KEY,
  CREATE_CV_KEY,
  UPDATE_CV_KEY,
  MESSAGE_DETAIL_KEY,
  MESSAGE_KEY,
} from "./helpers/constants";
import { useAuthContext } from "./context";
import { CircularProgress } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  DashboardAppliedJobs,
  DashboardCategory,
  DashboardFavoriteJobs,
  DashboardMyJobs,
  DashboardOverview,
  DashboardPostAJob,
  DashboardSavedCandidate,
  DashboardSettings,
  DashboardUsers,
} from "./components/dashboard";
import { PageCompletedCompany } from "./pages/company";
import { EditJob } from "./components/job/MyJobs";

import { PageMessage, PageUpdateCV } from "./pages/home";
import { ApplicationList } from "./components/application";
import { Conversation, NoConversation } from "./components/messages";

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
  {
    route: getRoute(CREATE_COMPANY_KEY),
    element: <PageCreateCompany />,
  },
  {
    route: getRoute(COMPLETED_COMPANY_KEY),
    element: <PageCompletedCompany />,
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
    route: getRoute(MY_CV_KEY),
    element: <PageMyCV />,
  },
  {
    route: getRoute(CREATE_CV_KEY),
    element: <PageCreateCV />,
  },
  {
    route: getRoute(UPDATE_CV_KEY),
    element: <PageUpdateCV />,
  },
  {
    route: getRoute(DASHBOARD_KEY),
    element: <PageDashboard />,
  },
  {
    route: getRoute(JOB_DETAIL_KEY),
    element: <PageJobDetail />,
  },
  {
    route: getRoute(EMPLOYER_DETAIL_KEY),
    element: <PageEmployerDetail />,
  },
  {
    route: getRoute(MESSAGE_KEY),
    element: (
      <PageMessage>
        <NoConversation />
      </PageMessage>
    ),
  },
  {
    route: getRoute(MESSAGE_DETAIL_KEY),
    element: (
      <PageMessage>
        <Conversation />
      </PageMessage>
    ),
  },
];

const DashboardRoutes = [
  {
    route: getRoute(DASHBOARD_CATEGORIES_KEY),
    element: <DashboardCategory />,
  },
  {
    route: getRoute(DASHBOARD_OVERVIEW_KEY),
    element: <DashboardOverview />,
  },
  {
    route: getRoute(DASHBOARD_POST_A_JOB_KEY),
    element: <DashboardPostAJob />,
  },
  {
    route: getRoute(DASHBOARD_MY_JOBS_KEY),
    element: <DashboardMyJobs />,
  },
  {
    route: getRoute(DASHBOARD_EDIT_JOB_KEY),
    element: <EditJob />,
  },
  {
    route: getRoute(DASHBOARD_APPLICATIONS_KEY),
    element: <ApplicationList />,
  },
  {
    route: getRoute(DASHBOARD_SAVED_CANDIDATE_KEY),
    element: <DashboardSavedCandidate />,
  },
  {
    route: getRoute(DASHBOARD_APPLIED_JOBS_KEY),
    element: <DashboardAppliedJobs />,
  },
  {
    route: getRoute(DASHBOARD_FAVORITE_JOBS_KEY),
    element: <DashboardFavoriteJobs />,
  },
  {
    route: getRoute(DASHBOARD_SETTINGS_KEY),
    element: <DashboardSettings />,
  },
  {
    route: getRoute(DASHBOARD_USERS_KEY),
    element: <DashboardUsers />,
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
  const [dashboardRoutes, setDashboardRoutes] = useState<
    Array<{ route: RouteItem; element: JSX.Element }>
  >([]);

  useEffect(() => {
    setAuthenRoutes(AuthenRoutes);
    setPrivateRoutes(OtherRoutes.filter((route) => route.route.isPrivate));
    setPublicRoutes(OtherRoutes.filter((route) => !route.route.isPrivate));
    setDashboardRoutes(DashboardRoutes);
  }, []);
  if (typeof user === "string")
    return (
      <CircularProgress
        isIndeterminate
        color="var(--primary-500)"
        size="25px"
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
            {privateRoutes.map((route) => {
              if (route.route.key !== DASHBOARD_KEY)
                return (
                  <Route path={route.route.path} element={route.element} />
                );
              else
                return (
                  <Route path={route.route.path} element={route.element}>
                    {dashboardRoutes.map((route) => (
                      <Route path={route.route.path} element={route.element} />
                    ))}
                  </Route>
                );
            })}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
