import { IconType } from "react-icons";
import { CiCalendar } from "react-icons/ci";
import { Heading } from "../headings";
import { Text } from "../text";
import { changeDateToString } from "../../utils";
import { PiBriefcaseLight, PiTimer, PiWalletLight } from "react-icons/pi";
import { SlLocationPin } from "react-icons/sl";
import { BsCalendar4Week } from "react-icons/bs";
import { RiUserStarLine } from "react-icons/ri";

interface InfoProps {
  Icon?: IconType;
  title?: string;
  info?: string;
}
function Info({ Icon = CiCalendar, title = "", info = "" }: InfoProps) {
  return (
    <div>
      <Icon size={30} color="var(--primary-500)" />
      <Text className="text-[10px] mt-[8px]">{title}</Text>
      <Heading size={14} name={info} />
    </div>
  );
}

export default function JobOverview({ job }: { job: any }) {
  const overviews: Array<InfoProps> = [
    {
      Icon: CiCalendar,
      title: "JOB POSTED",
      info: changeDateToString(job?.createdAt),
    },
    {
      Icon: PiTimer,
      title: "JOB EXPIRE IN",
      info: changeDateToString(job?.expirationDate),
    },
    {
      Icon: PiBriefcaseLight,
      title: "EDUCATION",
      info: job?.education,
    },
    {
      Icon: PiWalletLight,
      title: "SALARY",
      info: `$${job?.minSalary / 1000}k - ${job?.maxSalary / 1000}k/month`,
    },
    {
      Icon: SlLocationPin,
      title: "LOCATION",
      info: job?.company?.mapLocation,
    },
    {
      Icon: BsCalendar4Week,
      title: "JOB TYPE",
      info: job?.jobType,
    },
    {
      Icon: RiUserStarLine,
      title: "EXPERIENCE",
      info: job?.experience,
    },
  ];
  return (
    <div className="border-[1px] border-[--gray-100] rounded-md w-full h-[450px] p-5">
      <Heading size={18} name="Job Overview" />
      <div className="mt-6 grid grid-cols-3 gap-6">
        {overviews.map((overview) => (
          <Info {...overview} />
        ))}
      </div>
    </div>
  );
}
