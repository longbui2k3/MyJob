import { Outlet, useNavigate } from "react-router-dom";
import { NavigationDashboard } from "../../components/dashboard";
import {
  DASHBOARD_OVERVIEW_KEY,
  DEFAULT_PADDING_X,
  getRoute,
  UserTypes,
} from "../../helpers/constants";
import { useEffect } from "react";
import { useAuthContext } from "../../context";

export default function PageDashboard() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  useEffect(() => {
    if (window.location.pathname.split("/").length === 2)
      navigate(getRoute(DASHBOARD_OVERVIEW_KEY).path);
  }, []);
  return (
    <div
      className={`flex border-y-[1px] border-[--gray-100]`}
      style={{
        padding: `0px ${DEFAULT_PADDING_X} ${
          typeof user !== "string" && user?.userType === UserTypes.EMPLOYER
            ? "px-[0px]"
            : ""
        }`,
      }}
    >
      <div className="w-[25%] border-r-[1px] border-[--gray-100]">
        <NavigationDashboard />
      </div>
      <div className="w-[75%] border-l-[1px] border-[--gray-100] p-10 pr-0">
        <Outlet />
      </div>
    </div>
  );
}
