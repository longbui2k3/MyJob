import { DEFAULT_PADDING_X, ViewTypes } from "../../helpers/constants";
import { Pagination, usePagination } from "../global";
import { CreatedAtSelect } from "../select/CreatedAtSelect";
import { PageLimitSelect } from "../select/PageLimitSelect";
import { useViewTypeSelect, ViewTypeSelect } from "../select/ViewTypeSelect";
import ActiveFilter from "./ActiveFilter";
import JobGrid from "./JobGrid";
import JobRowsFill from "./JobRowsFill";

export default function JobList() {
  const { viewType, setViewType } = useViewTypeSelect();
  const { curPage, setCurPage } = usePagination();

  const Jobs = {
    GRID: () => (
      <div className="grid grid-cols-3 gap-4">
        {new Array(10).fill(0).map(() => (
          <JobGrid />
        ))}
      </div>  
    ),
    ROWS_FILL: () => (
      <div className="flex flex-col space-y-4">
        {new Array(10).fill(0).map(() => (
          <JobRowsFill />
        ))}
      </div>
    ),
  };

  return (
    <div style={{ padding: `20px ${DEFAULT_PADDING_X}` }}>
      <div className="flex items-center justify-between">
        <div className="flex space-x-4">
          <ActiveFilter label="Design" />
          <ActiveFilter label="New York" />
        </div>
        <div className="flex space-x-4">
          <CreatedAtSelect height="40px" />
          <PageLimitSelect height="40px" width="200px" />
          <ViewTypeSelect viewType={viewType} setViewType={setViewType} />
        </div>
      </div>
      <div className="mt-8 mb-16">
        {viewType === ViewTypes.GRID ? <Jobs.GRID /> : <Jobs.ROWS_FILL />}
      </div>
      <Pagination curPage={curPage} setCurPage={setCurPage} />
    </div>
  );
}
