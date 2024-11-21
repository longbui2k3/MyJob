import { IconType } from "react-icons";
import { CiCalendar } from "react-icons/ci";
import { Text } from "../text";
import { Heading } from "../headings";
import { changeDateToString } from "../../utils";
import { GoOrganization } from "react-icons/go";
import { AiOutlineTeam } from "react-icons/ai";
import { PiBriefcaseLight } from "react-icons/pi";

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

export default function CompanyOverview({ company }: { company: any }) {
  const overviews: Array<InfoProps> = [
    {
      Icon: CiCalendar,
      title: "FOUNDED IN",
      info: changeDateToString(company?.yearOfEstablishment),
    },
    {
      Icon: GoOrganization,
      title: "ORGANIZATION TYPE",
      info: company.organizationType,
    },
    {
      Icon: AiOutlineTeam,
      title: "TEAM SIZE",
      info: company.teamSize,
    },
    {
      Icon: PiBriefcaseLight,
      title: "INDUSTRY TYPE",
      info: company.industryType,
    },
  ];
  return (
    <div className="border-[1px] border-[--gray-100] rounded-md w-full h-[300px] p-5">
      <Heading size={18} name="Company Overview" />
      <div className="mt-6 grid grid-cols-2 gap-6">
        {overviews.map((overview) => (
          <Info {...overview} />
        ))}
      </div>
    </div>
  );
}
