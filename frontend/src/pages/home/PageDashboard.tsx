import { Outlet, useNavigate } from "react-router-dom";
import { NavigationDashboard } from "../../components/dashboard";
import {
  DASHBOARD_OVERVIEW_KEY,
  DEFAULT_PADDING_X,
  getRoute,
} from "../../helpers/constants";
import { useEffect } from "react";

export default function PageDashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(getRoute(DASHBOARD_OVERVIEW_KEY).path);
  }, []);
  return (
    <div
      className={`flex border-y-[1px] border-[--gray-100]`}
      style={{
        padding: `0px ${DEFAULT_PADDING_X}`,
      }}
    >
      <div className="w-[25%] border-r-[1px] border-[--gray-100]">
        <NavigationDashboard />
      </div>
      <div className="w-[75%] border-l-[1px] border-[--gray-100]">
        <Outlet />
      </div>
    </div>
  );
}
