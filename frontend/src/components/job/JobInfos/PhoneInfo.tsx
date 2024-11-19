import { HiOutlinePhone } from "react-icons/hi";
import { Info } from "../../global";

interface PhoneInfoProps {
  info?: string;
}

export default function PhoneInfo({ info = "" }: PhoneInfoProps) {
  return (
    <Info Icon={HiOutlinePhone} info={info} iconColor="var(--primary-500)" />
  );
}
