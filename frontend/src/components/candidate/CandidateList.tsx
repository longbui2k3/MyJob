import { useEffect, useState } from "react";
import { DEFAULT_PADDING_X, ViewTypes } from "../../helpers/constants";
import { Pagination, usePagination } from "../global";
import { PageLimitSelect, usePageLimitSelect } from "../select/PageLimitSelect";
import { useViewTypeSelect, ViewTypeSelect } from "../select/ViewTypeSelect";
import CandidateRowsFill from "./CandidateRowsFill";
import { FindApplicationsAPI } from "../../apis";
import CandidateGrid from "./CandidateGrid";

export default function CandidateList() {
  const { viewType, setViewType } = useViewTypeSelect();
  const { curPage, setCurPage } = usePagination();
  const { limit, handleLimitChange } = usePageLimitSelect();
  const [size, setSize] = useState(1);
  const [applications, setApplications] = useState<Array<any>>([]);
  async function findCandidates(page: number) {
    const data = await FindApplicationsAPI({
      page,
      limit,
    });
    if (data.isSuccess) {
      setApplications(data.metadata.applications);
      setSize(data.metadata.meta.size);
    }
  }
  useEffect(() => {
    setCurPage(1);
    findCandidates(1);
  }, [limit]);
  useEffect(() => {
    findCandidates(curPage);
  }, [curPage]);
  const Candidates = {
    GRID: () => (
      <div className="grid grid-cols-2 gap-4">
        {applications.map((application) => (
          <CandidateGrid
            _id={application._id}
            avatar={application.profile.avatar}
            fullName={application.profile.fullName}
            jobId={application.job._id}
            jobTitle={application.job.jobTitle}
            provinceCode={application.profile.provinceCode}
            experience={application.profile.experience}
            companyName={application.job.company.companyName}
          />
        ))}
      </div>
    ),
    ROWS_FILL: () => (
      <div className="flex flex-col space-y-4">
        {applications.map((application) => (
          <CandidateRowsFill
            _id={application._id}
            avatar={application.profile.avatar}
            fullName={application.profile.fullName}
            jobTitle={application.job.jobTitle}
            jobId={application.job._id}
            provinceCode={application.profile.provinceCode}
            experience={application.profile.experience}
          />
        ))}
      </div>
    ),
  };
  return (
    <div style={{ padding: `20px ${DEFAULT_PADDING_X}` }}>
      <div className="flex items-center flex-row-reverse">
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
        {viewType === ViewTypes.GRID ? (
          <Candidates.GRID />
        ) : (
          <Candidates.ROWS_FILL />
        )}
      </div>
      <Pagination curPage={curPage} setCurPage={setCurPage} size={size} />
    </div>
  );
}
