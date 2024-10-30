import { CompanyList } from "../../components/company";
import { BreadcrumbHeader } from "../../components/global";
import { FIND_EMPLOYERS_KEY, getBreadcrumb } from "../../helpers/constants";

export default function PageFindEmployers() {
  return (
    <>
      <BreadcrumbHeader breadcrumbRoutes={getBreadcrumb(FIND_EMPLOYERS_KEY)} />
      <CompanyList />
    </>
  );
}
