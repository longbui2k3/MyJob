import { Outlet } from "react-router-dom";
import { Footer, Header } from "../components/global";
import { useSelector } from "react-redux";
import { FormCategory } from "../components/category";

export default function Cover() {
  const isOpenForm = useSelector((state: any) => state.openForm.isOpenForm);
  return (
    <div className="relative w-full">
      {isOpenForm ? <FormCategory /> : ""}
      <Header />
      <div className="pt-[130px]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
