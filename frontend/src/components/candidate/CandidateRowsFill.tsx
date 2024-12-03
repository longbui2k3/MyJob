import { Heading, Heading6 } from "../headings";
import { ButtonSolid_2 } from "../buttons";
import { FiArrowRight } from "react-icons/fi";
import { LocationInfo } from "../company";
import provinces from "../../data/provinces.json";
import { ExperienceInfo } from "../company/CompanyInfos";
import { getRoute } from "../../helpers/constants";
import { CANDIDATE_DETAIL_KEY } from "../../helpers/constants/routes";
import { useNavigate } from "react-router-dom";
import UnsavedCandidateIcon from "./UnsavedCandidateIcon";
import SavedCandidateIcon from "./SavedCandidateIcon";
import { useEffect, useState } from "react";
import { FindSavedCandidateAPI } from "../../apis";
import { useDispatch } from "react-redux";
import { openFormApplicationDetail, setId } from "../../features";
interface CandidateRowsFillProps {
  _id?: string;
  avatar?: string;
  fullName?: string;
  title?: string;
  provinceCode?: number;
  experience?: string;
}

export default function CandidateRowsFill({
  _id = "",
  avatar = "",
  fullName = "",
  title = "",
  provinceCode = 0,
  experience = "",
}: CandidateRowsFillProps) {
  const dispatch = useDispatch();
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
          <Heading6 name={title} />
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
        <ButtonSolid_2
          children={"View Profile"}
          rightIcon={<FiArrowRight className="text-[18px]" />}
          onClick={() => {
            dispatch(openFormApplicationDetail());
            dispatch(setId(_id));
          }}
        />
      </div>
    </div>
  );
}
