import { Tag } from "@chakra-ui/react";
import { Heading6 } from "../headings";
import { CiBookmark, CiCalendar, CiLocationOn } from "react-icons/ci";
import { PiCurrencyDollarLight } from "react-icons/pi";
import { ButtonSubmit } from "../buttons";
import { DeadlineInfo, LocationInfo, SalaryInfo } from "../company";

export default function Job() {
  return (
    <div className="flex justify-between w-full p-5 border-[1px] border-[--gray-100]">
      <div className="flex">
        <img src="/upwork.png" width={"50px"} />
        <div className="flex flex-col justify-between ml-4">
          <div className="flex space-x-3">
            <Heading6 name="Senior UX Designer" />
            <Tag
              bg="var(--primary-50)"
              textColor={"var(--primary-500)"}
              fontSize={"13px"}
              paddingX={"8px"}
              paddingY="4px"
              marginY="auto"
            >
              Full Name
            </Tag>
          </div>
          <div className="flex space-x-2">
            <LocationInfo info={"China"} />
            <SalaryInfo info={"$50K-$60K"} />
            <DeadlineInfo info={"4 Days Remaining"} />
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
