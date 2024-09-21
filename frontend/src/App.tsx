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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<PageSignin />} />
        <Route path="/signup" element={<PageSignup />} />
        <Route path="/forgotpassword" element={<PageForgotPassword />} />
        <Route path="/verify" element={<PageEmailVerification />} />
        <Route path="/resetpassword/:token" element={<PageResetPassword />} />
        <Route path="/" element={<Cover />}>
          <Route path="" element={<PageHome />} />
          <Route path="home" element={<PageHome />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
