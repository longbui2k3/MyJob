import { Outlet } from "react-router-dom";
import { Footer, Header } from "../components/global";


export default function Cover() {
  return (
    <div className="w-full">
      <Header />
      <div className="mt-[130px]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
