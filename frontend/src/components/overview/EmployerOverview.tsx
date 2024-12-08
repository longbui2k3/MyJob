import { FiArrowRight } from "react-icons/fi";
import {
  DASHBOARD_MY_JOBS_KEY,
  DASHBOARD_SAVED_CANDIDATE_KEY,
  getRoute,
} from "../../helpers/constants";
import { ButtonOutline } from "../buttons";
import { Heading5, Heading6 } from "../headings";
import FunFacts from "./FunFacts";
import { JobIcon, SavedIcon } from "../icons";
import { useNavigate } from "react-router-dom";
import { MyJobs } from "../job/MyJobs";
import { useAuthContext } from "../../context";
import { FindJobsAPI, FindSavedCandidatesByUser } from "../../apis";
import { useEffect, useState } from "react";

export default function EmployerOverview() {
  const { user, userId } = useAuthContext();
  const [jobsNum, setJobsNum] = useState<number>(0);
  const [savedCandidatesNum, setSavedCandidatesNum] = useState<number>(0);

  async function statisticize() {
    const jobs = await FindJobsAPI({
      company: userId || undefined,
    });
    const savedCandidates = await FindSavedCandidatesByUser({});
    if (jobs.isSuccess && savedCandidates.isSuccess) {
      setJobsNum(jobs.metadata.jobs.length);
      setSavedCandidatesNum(savedCandidates.metadata.savedCandidates.length);
    }
  }

  useEffect(() => {
    statisticize();
  }, []);
  const navigate = useNavigate();
  return (
    <div className="space-y-7">
      <div>
        <Heading5
          name={`Hello, ${
            typeof user !== "string" ? user?.fullName || user?.username : ""
          }`}
        />
        <p className="text-gray-500">
          Here is your daily activities and job alerts
        </p>
      </div>
      <div className="flex space-x-4">
        <FunFacts
          number={jobsNum}
          title="Open Jobs"
          onClick={() => {
            navigate(getRoute(DASHBOARD_MY_JOBS_KEY).path, {
              replace: true,
            });
          }}
          classname="bg-[#E7F0FA]"
          icon={<JobIcon />}
        />
        <FunFacts
          number={savedCandidatesNum}
          title="Saved Candidates"
          onClick={() => {
            navigate(getRoute(DASHBOARD_SAVED_CANDIDATE_KEY).path, {
              replace: true,
            });
          }}
          classname="bg-[#FFF6E6]"
          icon={<SavedIcon />}
        />
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <Heading6 name="Recently Posted Jobs" />
          <ButtonOutline
            children={"View all"}
            rightIcon={<FiArrowRight className="text-[18px]" />}
            onClick={() => {
              navigate(getRoute(DASHBOARD_MY_JOBS_KEY).path, {
                replace: true,
              });
            }}
          />
        </div>
        <MyJobs isCheck={false} limit={5} />
      </div>
    </div>
  );
}
