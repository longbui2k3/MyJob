import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import {
  Cover,
  PageDashboard,
  PageEmailVerification,
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
  FORGOT_PASSWORD_KEY,
  getRoute,
  HOME_KEY,
  RESET_PASSWORD_KEY,
  SIGN_IN_KEY,
  SIGN_UP_KEY,
  VERIFY_KEY,
} from "./helpers/constants";
import { useAuthContext } from "./context";
import { CircularProgress } from "@chakra-ui/react";

function App() {
  const { user } = useAuthContext();
  if (typeof user === "string") return <CircularProgress isIndeterminate color="var(--primary-500)" size="30px" />;
  return (
    <BrowserRouter> 
      <Routes>
        <Route path={getRoute(SIGN_IN_KEY).path} element={<PageSignin />} />
        <Route path={getRoute(SIGN_UP_KEY).path} element={<PageSignup />} />
        <Route
          path={getRoute(FORGOT_PASSWORD_KEY).path}
          element={<PageForgotPassword />}
        />
        <Route
          path={getRoute(VERIFY_KEY).path}
          element={<PageEmailVerification />}
        />
        <Route
          path={getRoute(RESET_PASSWORD_KEY).path}
          element={<PageResetPassword />}
        />
        <Route path={getRoute(DEFAULT_KEY).path} element={<Cover />}>
          <Route path={getRoute(DEFAULT_KEY).path} element={<PageHome />} />
          <Route path={getRoute(HOME_KEY).path} element={<PageHome />} />
          <Route path={getRoute(DEFAULT_KEY).path} element={<PrivateRoutes />}>
            <Route
              path={getRoute(DASHBOARD_KEY).path}
              element={<PageDashboard />}
            />
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
