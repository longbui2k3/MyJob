import { CreatedResumeList } from "../../components/created_resume";
import { BreadcrumbHeader } from "../../components/global";
import { UploadedResumeList } from "../../components/uploaded_resume";
import {
  DEFAULT_PADDING_X,
  getBreadcrumb,
  MY_CV_KEY,
} from "../../helpers/constants";

export default function PageMyCV() {
  return (
    <>
      <BreadcrumbHeader breadcrumbRoutes={getBreadcrumb(MY_CV_KEY)} />
      <div
        className="flex flex-col space-y-5"
        style={{ padding: `20px ${DEFAULT_PADDING_X}` }}
      >
        <UploadedResumeList />
        <CreatedResumeList />
      </div>
    </>
  );
}
