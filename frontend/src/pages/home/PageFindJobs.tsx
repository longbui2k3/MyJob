import { BreadcrumbHeader } from "../../components/global";
import { SearchInput_3 } from "../../components/inputs";
import { JobList } from "../../components/job";
import {
  DEFAULT_PADDING_X,
  FIND_JOBS_KEY,
  getBreadcrumb,
} from "../../helpers/constants";

export default function PageFindJobs() {
  return (
    <>
      <BreadcrumbHeader breadcrumbRoutes={getBreadcrumb(FIND_JOBS_KEY)} />
      <div
        className="bg-[--gray-100]"
        style={{
          padding: `0px ${DEFAULT_PADDING_X} 30px ${DEFAULT_PADDING_X}`,
        }}
      >
        <SearchInput_3 />
      </div>
      <JobList />
    </>
  );
}
