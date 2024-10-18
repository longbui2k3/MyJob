import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context";
import {
  CREATE_COMPANY_KEY,
  getRoute,
  SIGN_IN_KEY,
} from "../helpers/constants";

export default function PrivateRoutes() {
  const { user } = useAuthContext();
  if (typeof user === "string") return <></>;
  if (user === null) {
    return <Navigate to={getRoute(SIGN_IN_KEY).path} />;
  }
  if (user.hasCompany !== undefined && user.hasCompany === false) {
    return <Navigate to={getRoute(CREATE_COMPANY_KEY).path} replace={true} />;
  }
  return <Outlet />;
}
