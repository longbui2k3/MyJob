import { LocationInfo } from "../company";
import { Heading, Heading6 } from "../headings";
import provinces from "../../data/provinces.json";
import { ExperienceInfo } from "../company/CompanyInfos";
import { Text } from "../text";
import { ButtonOutline } from "../buttons";
import { FiArrowRight } from "react-icons/fi";
import { getRoute } from "../../helpers/constants";
import {
  CANDIDATE_DETAIL_KEY,
  JOB_DETAIL_KEY,
} from "../../helpers/constants/routes";
import { useNavigate } from "react-router-dom";

interface CandidateGridProps {
  _id?: string;
  avatar?: string;
  fullName?: string;
  jobTitle?: string;
  jobId?: string;
  provinceCode?: number;
  experience?: string;
  companyName?: string;
}

export default function CandidateGrid({
  _id = "",
  avatar = "",
  fullName = "",
  jobTitle = "",
  jobId = "",
  provinceCode = 0,
  experience = "",
  companyName = "",
}: CandidateGridProps) {
  const navigate = useNavigate();
  return (
    <div className="w-full p-5 border-[1px] border-[--gray-100] rounded-lg">
      <div className="flex justify-between">
        <div className="flex space-x-3">
          <img
            src={avatar}
            width={"52px"}
            height={"52px"}
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
                  className="hover:text-[--primary-500] hover:underline cursor-pointer"
                />
              </a>
            </div>
            <div className="flex space-x-2">
              <Text className="mt-[0px]" children={companyName} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="mt-4 space-y-2">
          <Heading name={fullName} size={17} className="" />
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
        <div className="flex flex-col-reverse">
          <ButtonOutline
            children={
              <div className="flex items-center transition-all duration-500 ease-in-out hover:scale-105 bg-none">
                <div>View Profile</div>
                <FiArrowRight className="text-[16px] ml-2" />
              </div>
            }
            border="0px"
            isHover={false}
            className="w-[100px]"
            onClick={(e) => {
              e.preventDefault();
              navigate(
                getRoute(CANDIDATE_DETAIL_KEY, {
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
