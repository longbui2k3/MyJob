import { FaBookmark } from "react-icons/fa";
import { Heading, Heading5, Heading6 } from "../headings";
import { ButtonSolid_2 } from "../buttons";
import { FiArrowRight } from "react-icons/fi";
import { LocationInfo } from "../company";
import provinces from "../../data/provinces.json";
import { ExperienceInfo } from "../company/CompanyInfos";
import { getRoute } from "../../helpers/constants";
import {
  CANDIDATE_DETAIL_KEY,
  JOB_DETAIL_KEY,
} from "../../helpers/constants/routes";
import { useNavigate } from "react-router-dom";
interface CandidateRowsFillProps {
  _id?: string;
  avatar?: string;
  fullName?: string;
  jobTitle?: string;
  jobId?: string;
  provinceCode?: number;
  experience?: string;
}

export default function CandidateRowsFill({
  _id = "",
  avatar = "",
  fullName = "",
  jobTitle = "",
  jobId = "",
  provinceCode = 0,
  experience = "",
}: CandidateRowsFillProps) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center border-[1px] border-[--gray-100] rounded-lg p-5 justify-between">
      <div className="flex items-center space-x-3">
        <img
          width={"70px"}
          height={"70px"}
          src={avatar}
          className="rounded-md aspect-square"
        />
        <div className="flex flex-col space-y-1">
          <Heading name={fullName} size={17} />
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
      <div className="flex items-center space-x-2">
        <FaBookmark
          fontSize={"25px"}
          className="my-auto"
          color="var(--primary-500)"
        />
        <ButtonSolid_2
          children={"View Profile"}
          rightIcon={<FiArrowRight className="text-[18px]" />}
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
        />
      </div>
    </div>
  );
}
