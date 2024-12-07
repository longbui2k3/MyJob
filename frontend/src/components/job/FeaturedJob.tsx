import { FiArrowRight } from "react-icons/fi";
import { ButtonOutline } from "../buttons";
import { Heading3 } from "../headings";
import JobRowsFill from "./JobRowsFill";
import {
  DEFAULT_PADDING_X,
  FIND_JOBS_KEY,
  getRoute,
} from "../../helpers/constants";
import { FindJobsAPI } from "../../apis";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FeaturedJob() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Array<any>>([]);
  async function findJobs() {
    const data = await FindJobsAPI({
      limit: 6,
      page: 1,
    });
    if (data.isSuccess) {
      setJobs(data.metadata.jobs);
    }
  }
  useEffect(() => {
    findJobs();
  }, []);
  return (
    <div
      className={`w-full`}
      style={{
        padding: `80px ${DEFAULT_PADDING_X}`,
      }}
    >
      <div className="flex justify-between">
        <Heading3 name="Featured Job" />
        <ButtonOutline
          children={
            <div className="flex">
              <div>View All</div>
              <FiArrowRight className="text-[14px] my-auto ml-2" />
            </div>
          }
          className="my-auto"
          onClick={(e) => {
            navigate(getRoute(FIND_JOBS_KEY).path);
          }}
        />
      </div>
      <div className="mt-8 flex flex-col space-y-4">
        {jobs.map((job) => (
          <JobRowsFill
            _id={job._id}
            companyId={job.company._id}
            companyLogo={job.company.logo}
            companyLocation={job.company.mapLocation}
            jobTitle={job.jobTitle}
            jobType={job.jobType}
            minSalary={job.minSalary}
            maxSalary={job.maxSalary}
            expirationDate={job.expirationDate}
          />
        ))}
      </div>
    </div>
  );
}
