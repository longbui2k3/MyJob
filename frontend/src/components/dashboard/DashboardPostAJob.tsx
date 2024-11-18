import { Heading3 } from "../headings";
import { PostAJob } from "../job/PostAJob";

export default function DashboardSettings() {
  return (
    <div>
      <Heading3 name="Post a job" className="mb-2" />
      <PostAJob />
    </div>
  );
}
