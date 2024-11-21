import { Tag } from "@chakra-ui/react";
import { Heading6 } from "../../headings";
import { LocationInfo, SalaryInfo } from "../../company";

export default function AppliedJobInfo() {
  return (
    <>
      <div className="flex space-x-3">
        <img
          width={"52px"}
          height={"52px"}
          className="rounded-md aspect-square"
        />
        <div className="flex flex-col justify-between ml-4">
          <div className="flex space-x-3">
            <Heading6 name="Networking Engineer" />
            <Tag
              bg="var(--primary-50)"
              textColor={"var(--primary-500)"}
              fontSize={"13px"}
              paddingX={"8px"}
              paddingY="4px"
              marginY="auto"
            >
              Remote
            </Tag>
          </div>
          <div className="flex space-x-2">
            <LocationInfo info="Ho Chi Minh" />
            <SalaryInfo info={`$1000-$1200`} />
          </div>
        </div>
      </div>
    </>
  );
}
