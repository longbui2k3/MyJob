import { Outlet } from "react-router-dom";
import { Footer, Header } from "../components/global";
import { useSelector } from "react-redux";
import { FormCategory } from "../components/category";
import { FormResume } from "../components/resume";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Cover() {
  const isOpenFormCategory = useSelector(
    (state: any) => state.openForm.isOpenFormCategory
  );
  const isOpenFormResume = useSelector(
    (state: any) => state.openForm.isOpenFormResume
  );
  useEffect(() => {
    if (isOpenFormCategory || isOpenFormResume) window.scrollTo(0, 0);
  }, [isOpenFormCategory, isOpenFormResume]);
  return (
    <div className="relative w-full">
      {isOpenFormCategory ? <FormCategory /> : ""}
      {isOpenFormResume ? <FormResume /> : ""}
      <Header />
      <div className="pt-[130px]">
        <Outlet />
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
}
