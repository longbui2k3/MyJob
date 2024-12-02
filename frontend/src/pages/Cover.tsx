import { Outlet } from "react-router-dom";
import { Footer, Header } from "../components/global";
import { useSelector } from "react-redux";
import { FormCategory } from "../components/category";
import { FormResume } from "../components/uploaded_resume";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormApplyJob } from "../components/application";
import { useAuthContext } from "../context";

export default function Cover() {
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

  useEffect(() => {
    if (isOpenFormCategory || isOpenFormResume) window.scrollTo(0, 0);
  }, [isOpenFormCategory, isOpenFormResume]);
  return (
    <div className="relative w-full">
      {isOpenFormCategory ? <FormCategory /> : ""}
      {isOpenFormResume ? <FormResume /> : ""}
      {isOpenFormApplyJob ? <FormApplyJob /> : ""}
      <Header />
      <div
        className="pt-[130px]"
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "800px",
          height: "100%",
        }}
      >
        <Outlet />
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
}
