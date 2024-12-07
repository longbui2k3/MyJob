import { Outlet } from "react-router-dom";
import { CVViewer, Footer, Header } from "../components/global";
import { useSelector } from "react-redux";
import { FormCategory } from "../components/category";
import { FormResume } from "../components/uploaded_resume";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ApplicationDetail,
  FormApplyJob,
  FormSendEmail,
} from "../components/application";
import { useAuthContext } from "../context";
import { UserTypes } from "../helpers/constants";

import { useLocation } from "react-router-dom";
export default function Cover() {
  const location = useLocation();
  const { user } = useAuthContext();
  const isOpenFormCategory = useSelector(
    (state: any) => state.openForm.isOpenFormCategory
  );
  const isOpenFormResume = useSelector(
    (state: any) => state.openForm.isOpenFormResume
  );
  const isOpenFormApplyJob = useSelector(
    (state: any) => state.openForm.isOpenFormApplyJob
  );
  const isOpenApplicationDetail = useSelector(
    (state: any) => state.openForm.isOpenApplicationDetail
  );
  const isOpenFormSendEmail = useSelector(
    (state: any) => state.openForm.isOpenFormSendEmail
  );
  const isOpenCVViewer = useSelector(
    (state: any) => state.openForm.isOpenCVViewer
  );

  useEffect(() => {
    if (isOpenFormCategory || isOpenFormResume) window.scrollTo(0, 0);
  }, [isOpenFormCategory, isOpenFormResume]);
  return (
    <div className="relative w-full">
      {isOpenFormCategory ? <FormCategory /> : ""}
      {isOpenFormResume ? <FormResume /> : ""}
      {isOpenFormApplyJob ? <FormApplyJob /> : ""}
      {isOpenApplicationDetail ? <ApplicationDetail /> : ""}
      {isOpenFormSendEmail ? <FormSendEmail /> : ""}
      {isOpenCVViewer ? <CVViewer /> : ""}
      <Header />
      <div
        className={`${
          typeof user !== "string" && user?.userType === UserTypes.EMPLOYER
            ? "pt-[70px]"
            : "pt-[120px]"
        }`}
        style={{
          display: "flex",
          flexDirection: "column",

          height: "100%",
          ...(!["edit-cv", "create-cv"].includes(
            location.pathname.split("/")[2]
          )
            ? {
                minHeight: "800px",
              }
            : {}),
        }}
      >
        <Outlet />
      </div>
      <ToastContainer />
      {!["edit-cv", "create-cv"].includes(location.pathname.split("/")[2]) ? (
        <Footer />
      ) : (
        ""
      )}
    </div>
  );
}
