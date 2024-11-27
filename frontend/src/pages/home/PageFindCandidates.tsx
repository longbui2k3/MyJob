import { BreadcrumbHeader } from "../../components/global";
import { FIND_CANDIDATES_KEY, getBreadcrumb } from "../../helpers/constants";


export default function PageFindCandidates() {
  return (
    <>
      <BreadcrumbHeader breadcrumbRoutes={getBreadcrumb(FIND_CANDIDATES_KEY)} />
    </>
  );
}
