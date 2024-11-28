import { BreadcrumbHeader } from "../../components/global";
import { MyJobs } from "../../components/job/MyJobs";
import { DEFAULT_PADDING_X, getBreadcrumb } from "../../helpers/constants";
import { MY_JOBS_KEY } from "../../helpers/constants/routes";

export default function PageMyJobs() {
  return (
    <>
      <BreadcrumbHeader breadcrumbRoutes={getBreadcrumb(MY_JOBS_KEY)} />
      <div
        className="mt-7"
        style={{
          padding: `0px ${DEFAULT_PADDING_X} 30px ${DEFAULT_PADDING_X}`,
        }}
      >
        <MyJobs limit={10} />
      </div>
    </>
  );
}
