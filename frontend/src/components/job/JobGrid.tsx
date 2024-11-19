import { Tag } from "@chakra-ui/react";
import { Heading, Heading6 } from "../headings";
import { LocationInfo, SalaryInfo } from "../company";
import { CiBookmark } from "react-icons/ci";
import { ButtonOutline } from "../buttons";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface JobGridProps {
  _id?: string;
  companyLogo?: string;
  companyName?: string;
  companyLocation?: string;
  jobTitle?: string;
  jobType?: string;
  minSalary?: number;
  maxSalary?: number;
  isFeatured?: boolean;
}
export default function JobGrid({
  _id = "",
  companyLogo = "",
  companyName = "",
  companyLocation = "",
  jobTitle = "",
  jobType = "",
  minSalary = 0,
  maxSalary = 0,
  isFeatured = false,
}: JobGridProps) {
  const navigate = useNavigate();
  return (
    <div
      className={`w-full p-5 border-[1px] border-[--gray-100] rounded-lg bg-gradient-to-r ${
        isFeatured ? "from-[--featured]" : ""
      }`}
    >
      <div className="flex justify-between">
        <div className="flex space-x-3">
          <img
            src={companyLogo}
            width={"52px"}
            height={"52px"}
            className="rounded-md aspect-square"
          />
          <div className="flex flex-col justify-between ml-4">
            <div className="flex space-x-3">
              <Heading6 name={companyName} />
              {isFeatured ? (
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
              ) : (
                ""
              )}
            </div>
            <LocationInfo info={companyLocation.split(",").slice(-1)[0]} />
          </div>
        </div>
        <CiBookmark
          fontSize={"25px"}
          className="my-auto"
          color="var(--primary-500)"
        />
      </div>
      <div className="flex justify-between">
        <div className="mt-4 space-y-2">
          <Heading name={jobTitle} size={17} />
          <div className="flex space-x-2">
            <div className="flex items-center space-x-2 text-[--gray-500] text-[13px]">
              <div>{jobType}</div>
              <div>•</div>
            </div>
            <SalaryInfo info={`$${minSalary}-$${maxSalary}`} />
          </div>
        </div>
        <div className="flex flex-col-reverse">
          <ButtonOutline
            children={
              <div className="flex">
                <div>Apply Now</div>
                <FiArrowRight className="text-[14px] my-auto ml-2" />
              </div>
            }
            border="0px"
            isHover={false}
            className="w-[100px]"
            onClick={() => {
              navigate(`/jobs/${_id}`);
            }}
          />
        </div>
      </div>
    </div>
  );
}
