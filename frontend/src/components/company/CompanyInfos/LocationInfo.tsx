import { CiLocationOn } from "react-icons/ci";
import { Info } from "../../global";
interface LocationInfoProps {
  info?: string;
}
export default function LocationInfo({ info = "" }: LocationInfoProps) {
  return <Info Icon={CiLocationOn} info={info} />;
}
