import { useEffect, useState } from "react";
import { DEFAULT_PADDING_X, ViewTypes } from "../../helpers/constants";
import { Pagination, usePagination } from "../global";
import { PageLimitSelect, usePageLimitSelect } from "../select/PageLimitSelect";
import { useViewTypeSelect, ViewTypeSelect } from "../select/ViewTypeSelect";
import JobGrid from "./JobGrid";
import JobRowsFill from "./JobRowsFill";
import { FindJobsAPI } from "../../apis";
import { useSearchParams } from "react-router-dom";
import ActiveFilterList from "./ActiveFilterList";

export default function JobList() {
  const [searchParams, __] = useSearchParams();
  const { viewType, setViewType } = useViewTypeSelect();
  const { curPage, setCurPage } = usePagination();
  const { limit, handleLimitChange } = usePageLimitSelect();
  const [size, setSize] = useState(1);
  const [jobs, setJobs] = useState<Array<any>>([]);
  async function findJobs(page: number) {
    const provinceCode = searchParams.get("provinceCode");
    const data = await FindJobsAPI({
      limit,
      page,
      search: searchParams.get("search") || undefined,
      provinceCode: provinceCode ? Number(provinceCode) : undefined,
      category: searchParams.get("category") || undefined,
    });
    if (data.isSuccess) {
      setJobs(data.metadata.jobs);
      setSize(data.metadata.meta.size);
    }
  }
  useEffect(() => {
    setCurPage(1);
    findJobs(1);
  }, [
    limit,
    searchParams.get("search"),
    searchParams.get("provinceCode"),
    searchParams.get("category"),
  ]);
  useEffect(() => {
    findJobs(curPage);
  }, [curPage]);
  const Jobs = {
    GRID: () => (
      <div className="grid grid-cols-3 gap-4">
        {jobs.map((job) => (
          <JobGrid
            _id={job._id}
            companyLogo={job.company.logo}
            companyName={job.company.companyName}
            companyLocation={job.company.mapLocation}
            jobTitle={job.jobTitle}
            jobType={job.jobType}
            minSalary={job.minSalary}
            maxSalary={job.maxSalary}
          />
        ))}
      </div>
    ),
    ROWS_FILL: () => (
      <div className="flex flex-col space-y-4">
        {jobs.map((job) => (
          <JobRowsFill
            _id={job._id}
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
        {viewType === ViewTypes.GRID ? <Jobs.GRID /> : <Jobs.ROWS_FILL />}
      </div>
      <Pagination curPage={curPage} setCurPage={setCurPage} size={size} />
    </div>
  );
}
