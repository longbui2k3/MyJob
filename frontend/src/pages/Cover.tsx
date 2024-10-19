import { Outlet } from "react-router-dom";
import { Footer, Header } from "../components/global";
import { useSelector } from "react-redux";
import { FormEditCategory } from "../components/category";

export default function Cover() {
  const isOpenForm = useSelector((state) => state.openForm.isOpenForm);
  return (
    <div className="relative w-full">
      {isOpenForm ? <FormEditCategory /> : ""}
      <Header />
      <div className="pt-[130px]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
