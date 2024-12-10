import { IconType } from "react-icons";
import { Heading3 } from "../headings";
import { FaRegSmile } from "react-icons/fa";

interface FunFactsProps {
  classname?: string;
  Icon?: IconType;
  iconColor?: string;
  onClick?: (e) => void;
  number?: number;
  title?: string;
}
export default function FunFacts({
  classname,
  Icon = FaRegSmile,
  iconColor = "black",
  onClick,
  number,
  title,
}: FunFactsProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between p-5 w-[33%] h-[100px] rounded-lg cursor-pointer ${classname}`}
    >
      <div>
        <Heading3 name={`${number}`} />
        <p className="text-gray-600 mt-[-5px]">{title}</p>
      </div>
      <div className="flex justify-center w-[50px] h-[50px] rounded-md bg-white">
        {Icon ? <Icon size={"32"} color={iconColor} className="my-auto" /> : ""}
      </div>
    </div>
  );
}
