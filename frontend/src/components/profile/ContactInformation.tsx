import { IconType } from "react-icons";
import { CiCalendar, CiLocationOn } from "react-icons/ci";
import { Text } from "../text";
import { Heading } from "../headings";
import { Divider } from "@chakra-ui/react";
import { RiGlobalLine } from "react-icons/ri";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { TfiEmail } from "react-icons/tfi";
import provinces from "../../data/provinces.json";
interface InfoProps {
  Icon?: IconType;
  title?: string;
  info?: string;
  isEnd?: boolean;
}
function Info({
  Icon = CiCalendar,
  title = "",
  info = "",
  isEnd = false,
}: InfoProps) {
  return (
    <div className="relative flex items-center">
      <Icon size={28} color="var(--primary-500)" />
      <div className="ml-[12px]">
        <Text className="text-[10px] mt-[0px]">{title}</Text>
        <Heading size={14} name={info} />
      </div>
      {!isEnd ? <Divider size={"1"} className="absolute -bottom-5" /> : ""}
    </div>
  );
}

export default function ContactInformation({ profile }: { profile: any }) {
  const contacts: Array<InfoProps> = [
    {
      Icon: RiGlobalLine,
      title: "Website",
      info: profile?.personalWebsite,
    },
    {
      Icon: MdOutlinePhoneInTalk,
      title: "Phone",
      info: profile?.phone,
    },
    {
      Icon: CiLocationOn,
      title: "Location",
      info:
        provinces.find((province) => province.code === profile?.provinceCode)
          ?.english_name || profile?.mapLocation,
    },
    {
      Icon: TfiEmail,
      title: "Email",
      info: profile?.email,
    },
  ];
  return (
    <div className="border-2 border-[--gray-100] rounded-md w-full p-5">
      <Heading size={18} name="Contact Information" />
      <div className="mt-6 flex flex-col gap-8">
        {contacts.map((contact, i) => (
          <Info {...contact} isEnd={i === contacts.length - 1} />
        ))}
      </div>
    </div>
  );
}
