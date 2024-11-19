import { Info } from "../../global";
import { IoIosLink } from "react-icons/io";

interface LinkInfoProps {
  info?: string;
}

export default function LinkInfo({ info = "" }: LinkInfoProps) {
  return <Info Icon={IoIosLink} info={info} iconColor="var(--primary-500)" />;
}
