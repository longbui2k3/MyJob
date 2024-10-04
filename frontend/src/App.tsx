import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import {
  Cover,
  PageEmailVerification,
  PageForgotPassword,
  PageHome,
  PageResetPassword,
  PageSignin,
  PageSignup,
} from "./pages";
import { getRoute } from "./helpers/constants";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={getRoute("SIGN_IN").path} element={<PageSignin />} />
        <Route path={getRoute("SIGN_UP").path} element={<PageSignup />} />
        <Route
          path={getRoute("FORGOT_PASSWORD").path}
          element={<PageForgotPassword />}
        />
        <Route
          path={getRoute("VERIFY").path}
          element={<PageEmailVerification />}
        />
        <Route
          path={getRoute("RESET_PASSWORD").path}
          element={<PageResetPassword />}
        />
        <Route path={getRoute("__").path} element={<Cover />}>
          <Route path={getRoute("__").path} element={<PageHome />} />
          <Route path={getRoute("HOME").path} element={<PageHome />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
