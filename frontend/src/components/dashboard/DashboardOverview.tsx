import { useAuthContext } from "../../context";
import { CandidateOverview, EmployerOverview } from "../overview";

export default function DashboardOverview() {
  const { user } = useAuthContext();

  return (
    <>
      {typeof user === "object" && user?.userType === "employee" ? (
        <div>
          <CandidateOverview />
        </div>
      ) : (
        <div>
          <EmployerOverview />
        </div>
      )}
    </>
  );
}
