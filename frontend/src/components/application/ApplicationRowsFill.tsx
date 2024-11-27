import { Heading, Heading6 } from "../headings";
import { ButtonSolid_2 } from "../buttons";
import { FiArrowRight } from "react-icons/fi";
import { LocationInfo } from "../company";
import provinces from "../../data/provinces.json";
import { ExperienceInfo } from "../company/CompanyInfos";
import { getRoute } from "../../helpers/constants";
import {
  APPLICATION_DETAIL_KEY,
  JOB_DETAIL_KEY,
} from "../../helpers/constants/routes";
import { useNavigate } from "react-router-dom";
import { Divider } from "@chakra-ui/react";
interface ApplicationRowsFillProps {
  _id?: string;
  avatar?: string;
  fullName?: string;
  title?: string;
  jobId?: string;
  logo?: string;
  jobTitle?: string;
  jobProvinceCode?: number;
  jobExperience?: string;
  provinceCode?: number;
  experience?: string;
  companyName?: string;
}

export default function ApplicationRowsFill({
  _id = "",
  avatar = "",
  fullName = "",
  title = "",
  jobId = "",
  logo = "",
  jobTitle = "",
  jobProvinceCode = 0,
  jobExperience = "",
  provinceCode = 0,
  experience = "",
  companyName = "",
}: ApplicationRowsFillProps) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center border-[1px] border-[--gray-100] rounded-lg p-4 justify-between">
      <div className="flex items-center space-x-5">
        <div className="flex items-center space-x-3">
          <img
            width={"70px"}
            height={"70px"}
            src={avatar}
            className="rounded-full aspect-square"
          />
          <div className="flex flex-col space-y-1">
            <Heading name={fullName} size={17} />
            <Heading6 name={title} className="" />
            <div className="flex space-x-2">
              <LocationInfo
                info={
                  provinces.find((province) => province.code === provinceCode)
                    ?.english_name
                }
              />
              <ExperienceInfo info={experience} />
            </div>
          </div>
        </div>
        <Divider
          orientation="vertical"
          size={"10px"}
          color={"var(--gray-100)"}
          height={"100px"}
        />
        <div className="flex flex-row-reverse items-center space-x-3">
          <img
            width={"70px"}
            height={"70px"}
            src={logo}
            className="rounded-md aspect-square ml-4"
          />
          <div className="flex flex-col space-y-1 items-end">
            <a
              href={
                getRoute(JOB_DETAIL_KEY, {
                  param: {
                    id: jobId,
                  },
                }).path
              }
            >
              <Heading
                name={jobTitle}
                size={17}
                className="hover:text-[--primary-500] hover:underline cursor-pointer"
              />
            </a>
            <div className="flex space-x-2">
              <LocationInfo
                info={
                  provinces.find(
                    (province) => province.code === jobProvinceCode
                  )?.english_name
                }
              />
              <ExperienceInfo info={jobExperience} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {/* <FaBookmark
          fontSize={"25px"}
          className="my-auto"
          color="var(--primary-500)"
        /> */}
        <ButtonSolid_2
          children={"View Application"}
          rightIcon={<FiArrowRight className="text-[18px]" />}
          onClick={(e) => {
            e.preventDefault();
            navigate(
              getRoute(APPLICATION_DETAIL_KEY, {
                param: {
                  id: _id,
                },
              }).path
            );
          }}
        />
      </div>
    </div>
  );
}
