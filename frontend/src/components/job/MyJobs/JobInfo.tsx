import { useEffect, useState } from "react";

interface JobInfoProps {
  jobTitle?: string;
  jobType?: string;
  expirationDate?: string;
}
export default function JobInfo({
  jobTitle,
  jobType,
  expirationDate,
}: JobInfoProps) {
  const [daysRemaining, setDaysRemaining] = useState<number>(0);
  const handleDaysRemaining = (date?: string): number => {
    if (!date) return 0;
    const today = new Date();
    const expDate = new Date(date);

    const diffInTime = expDate.getTime() - today.getTime();
    const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));

    return diffInDays > 0 ? diffInDays : 0;
  };

  useEffect(() => {
    if (expirationDate) {
      setDaysRemaining(handleDaysRemaining(expirationDate));
    }
  }, [expirationDate]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };
  return (
    <>
      <div className="font-medium mb-2">{jobTitle}</div>
      <div className="flex font-normal text-sm text-gray-500 space-x-1">
        <div>{jobType}</div>
        <div className="font-bold">.</div>
        <div>
          {daysRemaining > 0
            ? `${daysRemaining} days remaining`
            : formatDate(expirationDate)}
        </div>
      </div>
    </>
  );
}
