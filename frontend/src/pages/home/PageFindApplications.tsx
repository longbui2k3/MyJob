import { ApplicationList } from "../../components/application";
import { BreadcrumbHeader } from "../../components/global";
import { FIND_APPLICATIONS_KEY, getBreadcrumb } from "../../helpers/constants";

export default function PageFindApplications() {
  return (
    <>
      <BreadcrumbHeader
        breadcrumbRoutes={getBreadcrumb(FIND_APPLICATIONS_KEY)}
      />
      <ApplicationList />
    </>
  );
}
