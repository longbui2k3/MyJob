import { HiOutlineMail } from "react-icons/hi";
import { Info } from "../../global";

interface MailInfoProps {
  info?: string;
}

export default function MailInfo({ info = "" }: MailInfoProps) {
  return (
    <Info Icon={HiOutlineMail} info={info} iconColor="var(--primary-500)" />
  );
}
