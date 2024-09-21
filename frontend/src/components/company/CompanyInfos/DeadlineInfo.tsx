import Info from "./Info";
import { CiCalendar } from "react-icons/ci";
interface DeadlineInfoProps {
  info?: string;
}
export default function DeadlineInfo({ info = "" }: DeadlineInfoProps) {
  return <Info Icon={CiCalendar} info={info} />;
}
