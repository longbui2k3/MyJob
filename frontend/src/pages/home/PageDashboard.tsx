import { NavigationDashboard } from "../../components/dashboard";
import { DEFAULT_PADDING_X } from "../../helpers/constants";

export default function PageDashboard() {
  return (
    <div
      className={`flex border-y-[1px] border-[--gray-100]`}
      style={{
        padding: `0px ${DEFAULT_PADDING_X}`,
      }}
    >
      <div className="w-[25%] border-r-[1px] border-[--gray-100]">
        <NavigationDashboard />
      </div>
      <div className="w-[75%] border-l-[1px] border-[--gray-100]"></div>
    </div>
  );
}
