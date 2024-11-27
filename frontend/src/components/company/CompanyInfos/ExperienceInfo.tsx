import { RiUserStarLine } from "react-icons/ri";
import { Info } from "../../global";

interface ExperienceInfoProps {
  info?: string;
}

export default function ExperienceInfo({ info = "" }: ExperienceInfoProps) {
  return <Info Icon={RiUserStarLine} info={info} />;
}
