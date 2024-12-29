import { useEffect, useState } from "react";
import {
  DEFAULT_PADDING_X,
  JobStatuses,
  ViewTypes,
} from "../../helpers/constants";
import { NotFoundList, Pagination, usePagination } from "../global";
import { PageLimitSelect, usePageLimitSelect } from "../select/PageLimitSelect";
import { useViewTypeSelect, ViewTypeSelect } from "../select/ViewTypeSelect";
import JobGrid from "./JobGrid";
import JobRowsFill from "./JobRowsFill";
import { FindJobsAPI } from "../../apis";
import { useSearchParams } from "react-router-dom";
import ActiveFilterList from "./ActiveFilterList";

export default function JobList() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, __] = useSearchParams();
  const { viewType, setViewType } = useViewTypeSelect();
  const { curPage, setCurPage } = usePagination();
  const { limit, handleLimitChange } = usePageLimitSelect();
  const [size, setSize] = useState(1);
  const [jobs, setJobs] = useState<Array<any>>([]);
  async function findJobs(page: number, jobs: Array<any>) {
    if (jobs[page - 1]) return;

    const provinceCode = searchParams.get("provinceCode");
    async function findJobsFromAPI(page: number) {
      const data = await FindJobsAPI({
        limit,
        page,
        search: searchParams.get("search") || undefined,
        provinceCode: provinceCode ? Number(provinceCode) : undefined,
        category: searchParams.get("category") || undefined,
        experiences:
          (searchParams.get("experiences") &&
            searchParams
              .get("experiences")
              ?.split("_")
              .map((val) => Number(val) + 1)) ||
          undefined,
        educations:
          (searchParams.get("educations") &&
            searchParams
              .get("educations")
              ?.split("_")
              .map((val) => Number(val) + 1)) ||
          undefined,
        jobLevels:
          (searchParams.get("jobLevels") &&
            searchParams
              .get("jobLevels")
              ?.split("_")
              .map((val) => Number(val) + 1)) ||
          undefined,
        jobTypes:
          (searchParams.get("jobTypes") &&
            searchParams
              .get("jobTypes")
              ?.split("_")
              .map((val) => Number(val) + 1)) ||
          undefined,
        salaryMin: searchParams.get("salary_min") || undefined,
        salaryMax: searchParams.get("salary_max") || undefined,
        status: JobStatuses.ACTIVE,
      });
      if (data.isSuccess) {
        // setJobs([...jobs, data.metadata.jobs]);
        // setSize(data.metadata.meta.size);
        return data.metadata;
      }
      return {
        jobs: [],
        meta: {
          size: 0,
        },
      };
    }
    setIsLoading(true);
    if (page === 1) {
      const data = await findJobsFromAPI(page);
      setJobs([...jobs, data.jobs]);
      setSize(data.meta.size);
    } else {
      const jobList = [];
      for (let i = 2; i <= size; i++) {
        const data = await findJobsFromAPI(i);
        jobList.push(data.jobs);
        if (i === size) {
          setSize(data.meta.size);
        }
      }
      setJobs([...jobs, ...jobList]);
    }
    setIsLoading(false);
  }
  useEffect(() => {
    setCurPage(1);
    findJobs(1, []);
  }, [limit, searchParams]);
  useEffect(() => {
    findJobs(curPage, [...jobs]);
  }, [curPage, searchParams]);

  const Jobs = {
    GRID: () => (
      <div className="grid grid-cols-2 gap-4">
        {(jobs[curPage - 1] || new Array(limit).fill({}))?.map((job) => (
          <JobGrid
            _id={job?._id}
            companyId={job?.company?._id}
            companyLogo={job?.company?.logo}
            companyName={job?.company?.companyName}
            companyLocation={job?.company?.mapLocation}
            jobTitle={job?.jobTitle}
            jobType={job?.jobType}
            minSalary={job?.minSalary}
            maxSalary={job?.maxSalary}
            expirationDate={job?.expirationDate}
            status={job?.status}
            isLoading={isLoading}
          />
        ))}
      </div>
    ),
    ROWS_FILL: () => (
      <div className="flex flex-col space-y-4">
        {(jobs[curPage - 1] || new Array(limit).fill({}))?.map((job) => (
          <JobRowsFill
            _id={job?._id}
            companyId={job?.company?._id}
            companyLogo={job?.company?.logo}
            companyLocation={job?.company?.mapLocation}
            jobTitle={job?.jobTitle}
            jobType={job?.jobType}
            minSalary={job?.minSalary}
            maxSalary={job?.maxSalary}
            expirationDate={job?.expirationDate}
            status={job?.status}
            isLoading={isLoading}
          />
        ))}
      </div>
    ),
  };

  return (
    <div style={{ padding: `20px ${DEFAULT_PADDING_X}` }}>
      <div className="flex items-center justify-between">
        <ActiveFilterList />
        <div className="flex space-x-4">
          <PageLimitSelect
            height="40px"
            width="200px"
            onChange={handleLimitChange}
          />
          <ViewTypeSelect viewType={viewType} setViewType={setViewType} />
        </div>
      </div>
      <div className="mt-8 mb-16">
        {!isLoading && jobs[curPage - 1]?.length === 0 ? (
          <NotFoundList info="No jobs matching your requirements have been found yet." />
        ) : viewType === ViewTypes.GRID ? (
          <Jobs.GRID />
        ) : (
          <Jobs.ROWS_FILL />
        )}
      </div>
      <Pagination curPage={curPage} setCurPage={setCurPage} size={size} />
    </div>
  );
}
