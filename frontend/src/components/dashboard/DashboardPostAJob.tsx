import { Heading5 } from "../headings";
import { PostAJob } from "../job/PostAJob";

export default function DashboardSettings() {
  return (
    <div>
      <Heading5 name="Post a job" className="mb-2" />
      <PostAJob jobId="" />
    </div>
  );
}
