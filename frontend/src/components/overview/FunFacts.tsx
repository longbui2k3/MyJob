import { Heading3 } from "../headings";

interface FunFactsProps {
  classname?: string;
  icon?: JSX.Element;
  onClick?: (e) => void;
  number?: number;
  title?: string;
}
export default function FunFacts({ classname, icon, onClick, number, title }: FunFactsProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between p-5 w-[33%] h-[100px] rounded-lg ${classname}`}
    >
      <div>
        <Heading3 name={`${number}`} />
        <p className="text-gray-600 mt-[-5px]">{title}</p>
      </div>
      {icon}
    </div>
  );
}
