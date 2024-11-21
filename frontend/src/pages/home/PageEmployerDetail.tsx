import { CompanyDetail } from "../../components/company";
import { BreadcrumbHeader } from "../../components/global";
import { getBreadcrumb } from "../../helpers/constants";
import { EMPLOYER_DETAIL_KEY } from "../../helpers/constants/routes";

export default function PageEmployerDetail() {
  return (
    <>
      <BreadcrumbHeader breadcrumbRoutes={getBreadcrumb(EMPLOYER_DETAIL_KEY)} />
      <CompanyDetail />
    </>
  );
}
