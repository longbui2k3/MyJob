import { BreadcrumbHeader } from "../../components/global";
import { JobDetail } from "../../components/job";
import { getBreadcrumb } from "../../helpers/constants";
import { JOB_DETAIL_KEY } from "../../helpers/constants/routes";

export default function PageJobDetail() {
  return (
    <>
      <BreadcrumbHeader breadcrumbRoutes={getBreadcrumb(JOB_DETAIL_KEY)} />
      <JobDetail />
    </>
  );
}
