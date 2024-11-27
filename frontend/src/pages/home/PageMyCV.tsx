import UploadedResumeList from "../../components/resume/UploadedResumeList";
import { DEFAULT_PADDING_X } from "../../helpers/constants";

export default function PageMyCV() {
  return (
    <div style={{ padding: `20px ${DEFAULT_PADDING_X}` }}>
      <UploadedResumeList />
    </div>
  );
}
