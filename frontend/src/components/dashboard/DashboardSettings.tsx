import { useAuthContext } from "../../context";
import { Tabs } from "../company";
import { Heading5 } from "../headings";
import { Profile } from "../profile";

export default function DashboardSettings() {
  const { user } = useAuthContext();
  return (
    <div>
      <Heading5 name="Settings" className="mb-2" />
      {typeof user === "object" && user?.userType === "employee" ? (
        <Profile />
      ) : (
        <Tabs />
      )}
    </div>
  );
}
