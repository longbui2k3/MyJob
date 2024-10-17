import { Progress } from "@chakra-ui/react";
import { Logo } from "../global";

export default function Navigation() {
  return (
    <div className="flex justify-between w-full py-[15px]">
      <a className="ml-[300px]" href="/">
        <Logo />
      </a>
      <div className="flex flex-col w-[312px] mr-[300px] ">
        <div className="h-5 [font-family:'Inter-Regular',Helvetica] font-normal text-gray-500 text-sm leading-5 mb-3">
          Setup Progress
        </div>
        <Progress className="rounded-[100px]" height={"8px"} value={0} />
      </div>
    </div>
  );
}
