import { FormBuildCV } from "../../components/created_resume";
import { BreadcrumbHeader } from "../../components/global";
import { CREATE_CV_KEY, getBreadcrumb } from "../../helpers/constants";

export default function PageCreateCV() {
  return (
    <>
      <BreadcrumbHeader breadcrumbRoutes={getBreadcrumb(CREATE_CV_KEY)} />
      <FormBuildCV />
    </>
  );
}
