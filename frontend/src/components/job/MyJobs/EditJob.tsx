import {
  DASHBOARD_EDIT_JOB_KEY,
  getBreadcrumb,
} from "../../../helpers/constants";
import { BreadcrumbHeader } from "../../global";
import { Heading5 } from "../../headings";
import { PostAJob } from "../PostAJob";
import { useParams } from "react-router-dom";

export default function EditJob() {
  const { jobId } = useParams();
  return (
    <div>
      <BreadcrumbHeader
        breadcrumbRoutes={getBreadcrumb(DASHBOARD_EDIT_JOB_KEY)}
        isDashboard={true}
      />
      <Heading5 name="Edit Job" className="mb-4" />
      <PostAJob jobId={jobId ? jobId : ""} />
    </div>
  );
}
