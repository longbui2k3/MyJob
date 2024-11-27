import { ApplicationDetail } from "../../components/application";
import { BreadcrumbHeader } from "../../components/global";
import { APPLICATION_DETAIL_KEY, getBreadcrumb } from "../../helpers/constants";

export default function PageApplicatioDetail() {
  return (
    <>
      <BreadcrumbHeader
        breadcrumbRoutes={getBreadcrumb(APPLICATION_DETAIL_KEY)}
      />
      <ApplicationDetail />
    </>
  );
}