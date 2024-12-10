import { Tag } from "@chakra-ui/react";
import { Heading6 } from "../../headings";
import { LocationInfo, SalaryInfo } from "../../company";
import { GiBackwardTime } from "react-icons/gi";
import { Text } from "../../text";
import { getRoute, JOB_DETAIL_KEY } from "../../../helpers/constants";

interface AppliedJobInfoProps {
  jobId?: string;
  logo?: string;
  jobTitle?: string;
  jobType?: string;
  mapLocation?: string;
  minSalary?: number;
  maxSalary?: number;
}

export default function AppliedJobInfo({
  jobId = "",
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
            <a
              href={
                getRoute(JOB_DETAIL_KEY, {
                  param: {
                    id: jobId,
                  },
                }).path
              }
            >
              <Heading6
                name={jobTitle}
                className="hover:text-[--primary-500] hover:underline"
              />
            </a>
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
