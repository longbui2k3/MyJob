import { useAuthContext } from "../../context";
import { Tabs } from "../company";
import { Heading3 } from "../headings";

export default function DashboardSettings() {
  const { user } = useAuthContext();
  return (
    <div>
      <Heading3 name="Settings" className="mb-2" />
      {typeof user === "object" && user?.userType === "employee" ? (
        <div>settings candidate</div>
      ) : (
        <Tabs />
      )}
    </div>
  );
}
