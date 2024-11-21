import { MyJobs } from "../job/MyJobs";

export default function DashboardMyJobs() {
  return <MyJobs isCheck={true} limit={7} />;
}
