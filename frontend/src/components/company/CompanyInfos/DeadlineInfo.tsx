import { CiCalendar } from "react-icons/ci";
import { Info } from "../../global";
interface DeadlineInfoProps {
  info?: string;
}
export default function DeadlineInfo({ info = "" }: DeadlineInfoProps) {
  return <Info Icon={CiCalendar} info={info} />;
}
