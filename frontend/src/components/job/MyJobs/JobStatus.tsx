import { CiCircleRemove } from "react-icons/ci";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

interface JobStatusProps {
  status?: string;
}
export default function JobStatus({ status }: JobStatusProps) {
  return (
    <div className="flex space-x-1 ">
      {status === "Active" ? (
        <IoCheckmarkCircleOutline color="green" size={22} />
      ) : (
        <CiCircleRemove color="red" size={22} />
      )}

      <div
        className={`text-sm ${
          status === "Active" ? "text-green-600" : "text-red-600"
        } `}
      >
        {status}
      </div>
    </div>
  );
}
