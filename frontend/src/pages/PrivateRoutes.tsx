import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context";
import {
  getRoute,
  SIGN_IN_KEY,
} from "../helpers/constants";

export default function PrivateRoutes() {
  const { user } = useAuthContext();
  if (typeof user === "string") return <></>;
  if (user === null) {
    return <Navigate to={getRoute(SIGN_IN_KEY).path} />;
  }
  return <Outlet />;
}
