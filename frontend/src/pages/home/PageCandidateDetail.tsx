import { CandidateDetail } from "../../components/candidate";
import { BreadcrumbHeader } from "../../components/global";
import { CANDIDATE_DETAIL_KEY, getBreadcrumb } from "../../helpers/constants";

export default function PageCandidateDetail() {
  return (
    <>
      <BreadcrumbHeader
        breadcrumbRoutes={getBreadcrumb(CANDIDATE_DETAIL_KEY)}
      />
      <CandidateDetail />
    </>
  );
}
