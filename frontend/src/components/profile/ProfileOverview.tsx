import { IconType } from "react-icons";
import { CiCalendar, CiMap } from "react-icons/ci";
import { Text } from "../text";
import { Heading } from "../headings";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { changeDateToString } from "../../utils";
import provinces from "../../data/provinces.json";
import { PiClipboardText } from "react-icons/pi";
import { FaRegUserCircle } from "react-icons/fa";
import { GoStack } from "react-icons/go";
import { SlGraduation } from "react-icons/sl";
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

export default function ProfileOverview({ profile }: { profile: any }) {
  const overviews: Array<InfoProps> = [
    {
      Icon: LiaBirthdayCakeSolid,
      title: "DATE OF BIRTH",
      info: changeDateToString(profile?.dateOfBirth),
    },
    {
      Icon: CiMap,
      title: "LOCATION",
      info: provinces.find(
        (province) => province.code === profile?.provinceCode
      )?.english_name,
    },
    {
      Icon: PiClipboardText,
      title: "MARITAL STATUS",
      info: profile?.maritalStatus,
    },
    {
      Icon: FaRegUserCircle,
      title: "GENDER",
      info: profile?.gender,
    },
    {
      Icon: GoStack,
      title: "EXPERIENCE",
      info: profile?.experience,
    },
    {
      Icon: SlGraduation,
      title: "EDUCATION",
      info: profile?.education,
    },
  ];
  return (
    <div className="border-2 border-[--gray-100] rounded-md w-full h-[400px] p-5">
      <Heading size={18} name="Profile Overview" />
      <div className="mt-6 grid grid-cols-2 gap-6">
        {overviews.map((overview) => (
          <Info {...overview} />
        ))}
      </div>
    </div>
  );
}
