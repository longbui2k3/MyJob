import { Tabs } from "../company";
import { Heading3 } from "../headings";

export default function DashboardSettings() {
  return (
    <div>
      <Heading3 name="Settings" className="mb-2" />
      <Tabs />
    </div>
  );
}
