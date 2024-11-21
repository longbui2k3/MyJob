import { PostAJob } from "../PostAJob";
import { useParams } from "react-router-dom";

export default function EditJob() {
  const { jobId } = useParams();
  return (
    <div>
      <PostAJob jobId={jobId} />
    </div>
  );
}
