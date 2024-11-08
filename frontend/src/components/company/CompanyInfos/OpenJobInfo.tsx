import { PiBriefcaseLight } from "react-icons/pi";
import Info from "./Info";

interface OpenJobInfoProps {
  info?: string;
}

export default function OpenJobInfo({ info = "" }: OpenJobInfoProps) {
  return <Info Icon={PiBriefcaseLight} info={info} />;
}
