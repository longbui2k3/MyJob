import { FiArrowRight } from "react-icons/fi";
import { ButtonOutline } from "../buttons";
import { Heading5, Heading6 } from "../headings";
import { JobIcon, SavedIcon } from "../icons";
import FunFacts from "./FunFacts";
import { AppliedJobs } from "../job/AppliedJobs";
import { useNavigate } from "react-router-dom";
import {
  DASHBOARD_APPLIED_JOBS_KEY,
  DASHBOARD_FAVORITE_JOBS_KEY,
  getRoute,
} from "../../helpers/constants";
import { useEffect, useState } from "react";
import { StatisticizeJobsAPI } from "../../apis";
import { useAuthContext } from "../../context";
import { PiBriefcaseLight } from "react-icons/pi";
import { GoBookmark } from "react-icons/go";

export default function CandidateOverview() {
  const { user } = useAuthContext();
  const [statistics, setStatistics] = useState<{
    applicationsNum: number;
    favoriteJobsNum: number;
  }>({
    applicationsNum: 0,
    favoriteJobsNum: 0,
  });

  async function statisticizeJobs() {
    const data = await StatisticizeJobsAPI();
    if (data.isSuccess) {
      setStatistics({
        applicationsNum: data.metadata.applicationsNum,
        favoriteJobsNum: data.metadata.favoriteJobsNum,
      });
    }
  }

  useEffect(() => {
    statisticizeJobs();
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
          number={statistics.applicationsNum}
          title="Applied jobs"
          onClick={() => {
            navigate(getRoute(DASHBOARD_APPLIED_JOBS_KEY).path, {
              replace: true,
            });
          }}
          classname="bg-[--primary-50]"
          Icon={PiBriefcaseLight}
          iconColor="var(--primary-500)"
        />
        <FunFacts
          number={statistics.applicationsNum}
          title="Favorite jobs"
          onClick={() => {
            navigate(getRoute(DASHBOARD_FAVORITE_JOBS_KEY).path, {
              replace: true,
            });
          }}
          classname="bg-[--warning-50]"
          Icon={GoBookmark}
          iconColor="var(--warning-500)"
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
        <AppliedJobs isPagination={false} isHeader={false} limit={5} />
      </div>
    </div>
  );
}
