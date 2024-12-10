import { useAuthContext } from "../../context";
import {
  AdminOverview,
  CandidateOverview,
  EmployerOverview,
} from "../overview";

export default function DashboardOverview() {
  const { user } = useAuthContext();
  const roleOverviews = {
    employee: <CandidateOverview />,
    employer: <EmployerOverview />,
    admin: <AdminOverview />,
  };
  return (
    <>
      {typeof user === "object" && user?.userType && (
        <div>{roleOverviews[user.userType]}</div>
      )}
    </>
  );
}
