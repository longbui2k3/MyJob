import { PiUsers } from "react-icons/pi";
import { FindApplicationsAPI } from "../../../apis";
import { useEffect, useState } from "react";

interface NumberOfApplicationsProps {
  job: string;
}
export default function NumberOfApplications({
  job,
}: NumberOfApplicationsProps) {
  const [applicationsCount, setApplicationsCount] = useState<number>(0);
  async function findApplications(job: string) {
    const data = await FindApplicationsAPI({ job });
    if (data.isSuccess) setApplicationsCount(data.metadata.applications.length);
  }
  useEffect(() => {
    findApplications(job);
  }, [job]);

  return (
    <div className="flex gap-1 text-sm">
      <PiUsers size={22} />
      <div>{applicationsCount} Applications</div>
    </div>
  );
}
