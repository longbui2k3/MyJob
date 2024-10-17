import { Navigate, Outlet } from "react-router-dom";
import { Footer, Header } from "../components/global";
import { useAuthContext } from "../context";
import { CREATE_COMPANY_KEY, getRoute } from "../helpers/constants";

export default function Cover() {
  const { user } = useAuthContext();
  if (
    typeof user !== "string" &&
    user &&
    user.hasCompany !== undefined &&
    user.hasCompany === false
  ) {
    return <Navigate to={getRoute(CREATE_COMPANY_KEY).path} replace={true} />;
  }
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
