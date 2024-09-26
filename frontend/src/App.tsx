import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import {
  PageEmailVerification,
  PageForgotPassword,
  PageResetPassword,
  PageSignin,
  PageSignup,
  PageCreateCompany,
} from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* authen */}
        <Route path="/signin" element={<PageSignin />} />
        <Route path="/signup" element={<PageSignup />} />
        <Route path="/forgotpassword" element={<PageForgotPassword />} />
        <Route path="/verify" element={<PageEmailVerification />} />
        <Route path="/resetpassword/:token" element={<PageResetPassword />} />

        {/* company */}
        <Route path="/createcompany" element={<PageCreateCompany />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
