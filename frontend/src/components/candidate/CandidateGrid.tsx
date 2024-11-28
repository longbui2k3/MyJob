import { LocationInfo } from "../company";
import { Heading, Heading6 } from "../headings";
import provinces from "../../data/provinces.json";
import { ExperienceInfo } from "../company/CompanyInfos";
import { ButtonOutline } from "../buttons";
import { FiArrowRight } from "react-icons/fi";
import { getRoute } from "../../helpers/constants";
import { CANDIDATE_DETAIL_KEY } from "../../helpers/constants/routes";
import { useNavigate } from "react-router-dom";
import UnsavedCandidateIcon from "./UnsavedCandidateIcon";
import SavedCandidateIcon from "./SavedCandidateIcon";
import { useEffect, useState } from "react";
import { FindSavedCandidateAPI } from "../../apis";

interface CandidateGridProps {
  _id?: string;
  avatar?: string;
  fullName?: string;
  title?: string;
  provinceCode?: number;
  experience?: string;
}

export default function CandidateGrid({
  _id = "",
  avatar = "",
  fullName = "",
  title = "",
  provinceCode = 0,
  experience = "",
}: CandidateGridProps) {
  const navigate = useNavigate();
  const [isSavedCandidate, setIsSavedCandidate] = useState(false);
  async function findSavedCandidate() {
    const data = await FindSavedCandidateAPI(_id);
    if (data.isSuccess) {
      setIsSavedCandidate(true);
    } else {
      setIsSavedCandidate(false);
    }
  }
  useEffect(() => {
    findSavedCandidate();
  }, []);
  return (
    <div className="w-full p-5 border-2 border-[--gray-100] rounded-lg">
      <div className="flex justify-between items-center space-x-3">
        <div className="flex">
          <img
            src={avatar}
            width={"52px"}
            height={"52px"}
            className="rounded-md aspect-square"
          />
          <div className="ml-4">
            <Heading name={fullName} size={17} className="" />
            <Heading6 name={title} />
          </div>
        </div>
        <div>
          {!isSavedCandidate ? (
            <UnsavedCandidateIcon
              candidateId={_id}
              setIsSavedCandidate={setIsSavedCandidate}
            />
          ) : (
            <SavedCandidateIcon
              candidateId={_id}
              setIsSavedCandidate={setIsSavedCandidate}
            />
          )}
        </div>
      </div>
      <div className="flex justify-between">
        <div className="mt-4 space-y-2">
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
