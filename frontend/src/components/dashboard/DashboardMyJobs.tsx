import { DASHBOARD_MY_JOBS_KEY, getBreadcrumb } from "../../helpers/constants";
import { BreadcrumbHeader } from "../global";
import { MyJobs } from "../job/MyJobs";

export default function DashboardMyJobs() {
  return (
    <>
      <BreadcrumbHeader
        breadcrumbRoutes={getBreadcrumb(DASHBOARD_MY_JOBS_KEY)}
        isDashboard={true}
      />
      <MyJobs />;
    </>
  );
}
