import { Tag } from "@chakra-ui/react";
import { Heading, Heading6 } from "../headings";
import { LocationInfo, SalaryInfo } from "../company";
import { CiBookmark } from "react-icons/ci";

export default function JobGrid() {
  return (
    <div className="w-full p-5 border-[1px] border-[--gray-100] rounded-lg bg-gradient-to-r from-[--featured]">
      <div className="flex justify-between">
        <div className="flex space-x-3">
          <img
            src="/upwork.png"
            width={"52px"}
            height={"52px"}
            className="rounded-md aspect-square"
          />
          <div className="flex flex-col justify-between ml-4">
            <div className="flex space-x-3">
              <Heading6 name="Upwork" />
              <Tag
                bg="var(--danger-50)"
                textColor={"var(--danger-500)"}
                fontSize={"13px"}
                paddingX={"8px"}
                paddingY="4px"
                marginY="auto"
              >
                Featured
              </Tag>
            </div>
            <LocationInfo info={"China"} />
          </div>
        </div>
        <CiBookmark
          fontSize={"25px"}
          className="my-auto"
          color="var(--primary-500)"
        />
      </div>

      <div className="mt-4 space-y-2">
        <Heading name="Senior UX Designer" size={17} />
        <div className="flex space-x-2">
          <div className="flex items-center space-x-2 text-[--gray-500] text-[13px]">
            <div>{"Full Time"}</div>
            <div>•</div>
          </div>
          <SalaryInfo info={"$50K-$60K"} />
        </div>
      </div>
    </div>
  );
}
