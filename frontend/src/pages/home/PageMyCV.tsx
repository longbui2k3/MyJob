import { BreadcrumbHeader } from "../../components/global";
import UploadedResumeList from "../../components/resume/UploadedResumeList";
import {
  DEFAULT_PADDING_X,
  getBreadcrumb,
  MY_CV_KEY,
} from "../../helpers/constants";

export default function PageMyCV() {
  return (
    <>
      <BreadcrumbHeader breadcrumbRoutes={getBreadcrumb(MY_CV_KEY)} />

      <div style={{ padding: `20px ${DEFAULT_PADDING_X}` }}>
        <UploadedResumeList />
      </div>
    </>
  );
}
