import { useAuthContext } from "../../context";
import { CandidateOverview } from "../overview";

export default function DashboardOverview() {
  const { user } = useAuthContext();

  return (
    <>
      {typeof user === "object" && user?.userType === "employee" ? (
        <div>
          <CandidateOverview />
        </div>
      ) : (
        <div>overview employer</div>
      )}
    </>
  );
}
