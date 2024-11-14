import { Tag } from "@chakra-ui/react";
import { Heading6 } from "../headings";
import { CiBookmark } from "react-icons/ci";
import { ButtonSubmit } from "../buttons";
import { DeadlineInfo, LocationInfo, SalaryInfo } from "../company";
import { distanceBetweenTwoDates } from "../../utils";

interface JobRowsFillProps {
  _id?: string;
  companyLogo?: string;
  companyLocation?: string;
  jobTitle?: string;
  jobType?: string;
  minSalary?: number;
  maxSalary?: number;
  expirationDate?: Date;
  isFeatured?: boolean;
}

export default function JobRowsFill({
  _id = "",
  companyLogo = "",
  companyLocation = "",
  jobTitle = "",
  jobType = "",
  minSalary = 0,
  maxSalary = 0,
  expirationDate = new Date(Date.now()),
  isFeatured = false,
}: JobRowsFillProps) {
  return (
    <div className="flex justify-between w-full p-5 border-[1px] border-[--gray-100] rounded-lg">
      <div className="flex space-x-3">
        <img
          src={companyLogo}
          width={"52px"}
          height={"52px"}
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
            <LocationInfo info={companyLocation.split(",").slice(-1)[0]} />
            <SalaryInfo info={`$${minSalary}-$${maxSalary}`} />
            <DeadlineInfo
              info={`${distanceBetweenTwoDates(
                new Date(expirationDate),
                new Date(Date.now())
              )} Remaining`}
            />
          </div>
        </div>
      </div>
      <div className="flex space-x-4 py-auto">
        <CiBookmark
          fontSize={"30px"}
          className="my-auto"
          color="var(--primary-500)"
        />
        <ButtonSubmit
          label="Apply Now"
          className="my-auto"
          height="40px"
          fontSize="13px"
        />
      </div>
    </div>
  );
}
