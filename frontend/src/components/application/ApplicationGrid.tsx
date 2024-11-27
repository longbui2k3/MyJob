import { useNavigate } from "react-router-dom";
import {
  APPLICATION_DETAIL_KEY,
  getRoute,
  JOB_DETAIL_KEY,
} from "../../helpers/constants";
import { Heading, Heading6 } from "../headings";
import { Text } from "../text";
import { LocationInfo } from "../company";
import provinces from "../../data/provinces.json";
import { ExperienceInfo } from "../company/CompanyInfos";
import { ButtonOutline } from "../buttons";
import { FiArrowRight } from "react-icons/fi";
interface ApplicationGridProps {
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

export default function ApplicationGrid({
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
}: ApplicationGridProps) {
  const navigate = useNavigate();
  return (
    <div className="w-full p-4 border-[1px] border-[--gray-100] rounded-lg">
      <div className="flex justify-between">
        <div className="flex space-x-3">
          <img
            src={avatar}
            width={"52px"}
            height={"52px"}
            className="rounded-full aspect-square"
          />
          <div className="flex flex-col justify-between ml-4">
            <div className="flex space-x-3">
              <Heading name={fullName} size={17} className="" />
            </div>
            <div className="flex space-x-2">
              <Text className="mt-[0px]" children={title} />
            </div>
          </div>
        </div>
        <div className="flex flex-row-reverse space-x-3">
          <img
            src={logo}
            width={"52px"}
            height={"52px"}
            className="rounded-md aspect-square ml-4"
          />
          <div className="flex flex-col justify-between items-end">
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
                <Heading
                  name={jobTitle}
                  size={17}
                  className={
                    "hover:text-[--primary-500] hover:underline cursor-pointer"
                  }
                />
              </a>
            </div>
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
      <div className="flex justify-between items-center mt-3">
        <div className="space-y-2">
          <div className="flex space-x-2 items-center">
            <LocationInfo
              info={
                provinces.find((province) => province.code === provinceCode)
                  ?.english_name
              }
            />
            <ExperienceInfo info={experience} />
          </div>
        </div>
        <div className="flex items-center">
          <ButtonOutline
            children={
              <div className="flex items-center transition-all duration-500 ease-in-out hover:scale-105 bg-none">
                <div>View Application</div>
                <FiArrowRight className="text-[16px] ml-2" />
              </div>
            }
            border="0px"
            isHover={false}
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
            bgColor="transparent"
          />
        </div>
      </div>
    </div>
  );
}
