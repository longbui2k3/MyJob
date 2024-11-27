import { Tag } from "@chakra-ui/react";
import { Heading6 } from "../../headings";
import { LocationInfo, SalaryInfo } from "../../company";
import { GiBackwardTime } from "react-icons/gi";
import { Text } from "../../text";

interface AppliedJobInfoProps {
  logo?: string;
  jobTitle?: string;
  jobType?: string;
  mapLocation?: string;
  minSalary?: number;
  maxSalary?: number;
}

export default function AppliedJobInfo({
  logo = "",
  jobTitle = "",
  jobType = "",
  mapLocation = "",
  minSalary = 0,
  maxSalary = 0,
}: AppliedJobInfoProps) {
  return (
    <>
      <div className="flex space-x-3">
        <img
          width={"52px"}
          height={"52px"}
          src={logo}
          className="rounded-md aspect-square"
        />
        <div className="flex flex-col justify-between ml-4">
          <div className="flex space-x-3">
            <Heading6 name={jobTitle} />
            <Tag
              bg="var(--primary-50)"
              textColor={"var(--primary-500)"}
              fontSize={"13px"}
              paddingX={"8px"}
              paddingY="4px"
              marginY="auto"
            >
              {jobType}
            </Tag>
          </div>
          <div className="flex space-x-2">
            <LocationInfo info={mapLocation} />
            <SalaryInfo info={`$${minSalary}-$${maxSalary}/month`} />
          </div>
        </div>
      </div>
    </>
  );
}
