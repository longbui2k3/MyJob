import { useEffect, useState } from "react";
import { DEFAULT_PADDING_X, ViewTypes } from "../../helpers/constants";
import { Pagination, usePagination } from "../global";
import { PageLimitSelect, usePageLimitSelect } from "../select/PageLimitSelect";
import { useViewTypeSelect, ViewTypeSelect } from "../select/ViewTypeSelect";
import { FindApplicationsAPI } from "../../apis";
import ApplicationGrid from "./ApplicationGrid";
import ApplicationRowsFill from "./ApplicationRowsFill";

export default function ApplicationList() {
  const { viewType, setViewType } = useViewTypeSelect();
  const { curPage, setCurPage } = usePagination();
  const { limit, handleLimitChange } = usePageLimitSelect();
  const [size, setSize] = useState(1);
  const [applications, setApplications] = useState<Array<any>>([]);
  async function findApplications(page: number) {
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
    findApplications(1);
  }, [limit]);
  useEffect(() => {
    findApplications(curPage);
  }, [curPage]);
  const Applications = {
    GRID: () => (
      <div className="grid grid-cols-2 gap-4">
        {applications.map((application) => (
          <ApplicationGrid
            _id={application._id}
            avatar={application.profile.avatar}
            fullName={application.profile.fullName}
            jobId={application.job._id}
            logo={application.job.company.logo}
            jobTitle={application.job.jobTitle}
            jobProvinceCode={application.job.company.provinceCode}
            jobExperience={application.job.experience}
            title={application.profile.title}
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
          <ApplicationRowsFill
            _id={application._id}
            avatar={application.profile.avatar}
            fullName={application.profile.fullName}
            jobId={application.job._id}
            logo={application.job.company.logo}
            jobTitle={application.job.jobTitle}
            jobProvinceCode={application.job.company.provinceCode}
            jobExperience={application.job.experience}
            title={application.profile.title}
            provinceCode={application.profile.provinceCode}
            experience={application.profile.experience}
            companyName={application.job.company.companyName}
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
          <Applications.GRID />
        ) : (
          <Applications.ROWS_FILL />
        )}
      </div>
      <Pagination curPage={curPage} setCurPage={setCurPage} size={size} />
    </div>
  );
}
