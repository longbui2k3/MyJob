import { FormBuildCV } from "../../components/created_resume";
import { BreadcrumbHeader } from "../../components/global";
import { getBreadcrumb, UPDATE_CV_KEY } from "../../helpers/constants";

export default function PageUpdateCV() {
  return (
    <>
      <BreadcrumbHeader breadcrumbRoutes={getBreadcrumb(UPDATE_CV_KEY)} />
      <FormBuildCV type="update" />
    </>
  );
}
