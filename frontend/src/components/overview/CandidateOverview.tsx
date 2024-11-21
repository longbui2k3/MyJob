import { FiArrowRight } from "react-icons/fi";
import { ButtonOutline } from "../buttons";
import { Heading5, Heading6 } from "../headings";
import { JobIcon, SavedIcon } from "../icons";
import FunFacts from "./FunFacts";
import { AppliedJobs } from "../job/AppliedJobs";
import { useNavigate } from "react-router-dom";
import { DASHBOARD_APPLIED_JOBS_KEY, getRoute } from "../../helpers/constants";

export default function CandidateOverview() {
  const navigate = useNavigate();
  return (
    <div className="space-y-7">
      <div>
        <Heading5 name="Hello, Esther Howard," />
        <p className="text-gray-500">
          Here is your daily activities and job alerts
        </p>
      </div>
      <div className="flex space-x-4">
        <FunFacts
          quantity="589"
          title="Applied jobs"
          onClick={() => {
            navigate(getRoute(DASHBOARD_APPLIED_JOBS_KEY).path, {
              replace: true,
            });
          }}
          classname="bg-[#E7F0FA]"
          icon={<JobIcon />}
        />
        <FunFacts
          quantity="238"
          title="Favorite jobs"
          classname="bg-[#FFF6E6]"
          icon={<SavedIcon />}
        />
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <Heading6 name="Recently Applied" />
          <ButtonOutline
            children={"View all"}
            rightIcon={<FiArrowRight className="text-[18px]" />}
            onClick={() => {
              navigate(getRoute(DASHBOARD_APPLIED_JOBS_KEY).path, {
                replace: true,
              });
            }}
          />
        </div>
        <AppliedJobs isCheck={false} />
      </div>
    </div>
  );
}
