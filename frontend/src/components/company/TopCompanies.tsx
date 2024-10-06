import { Tag } from "@chakra-ui/react";
import { ButtonSolid_2 } from "../buttons";
import { Heading3, Heading6 } from "../headings";
import { LocationInfo } from "./CompanyInfos";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

export default function TopCompanies() {
  return (
    <div className="w-full px-[240px] py-[80px]">
      <div className="flex justify-between">
        <Heading3 name="Top companies" />
        <div className="flex space-x-2">
          <ButtonSolid_2 children={<GoArrowLeft size={"20px"} />} />
          <ButtonSolid_2 children={<GoArrowRight size={"20px"} />} />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-8">
        {new Array(8).fill(0).map((val) => (
          <div className="flex flex-col space-y-4 p-5 border-[1px] border-[--gray-100]">
            <div className="flex space-x-2">
              <img src="/dribble.png" width={50} />
              <div className="flex flex-col justify-between">
                <div className="flex space-x-3">
                  <Heading6 name="Dribble" />
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
                <div className="flex">
                  <LocationInfo info="United States" />
                </div>
              </div>
            </div>
            <ButtonSolid_2 children={"Open Position"} />
          </div>
        ))}
      </div>
    </div>
  );
}
