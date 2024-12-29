import { useEffect, useState } from "react";
import JobRowsFill from "../JobRowsFill";
import { Pagination, usePagination } from "../../global";
import { FindFavoriteJobByUser } from "../../../apis/userAPI";
import { Heading5 } from "../../headings";
import { useSelector } from "react-redux";

export default function FavoriteJobs() {
  const [favoriteJobs, setFavoriteJobs] = useState<Array<any>>([]);
  const { curPage, setCurPage } = usePagination();
  const [size, setSize] = useState(1);
  const [length, setLength] = useState(0);
  const isDataChange = useSelector(
    (state: any) => state.changeData.isDataChange
  );
  async function findFavoriteJobs() {
    const data = await FindFavoriteJobByUser({
      page: curPage,
      limit: 6,
    });
    if (data.isSuccess) {
      setFavoriteJobs(data.metadata.favoriteJobs);
      setSize(data.metadata.meta.size);
      setLength(data.metadata.meta.length);
    }
  }
  useEffect(() => {
    findFavoriteJobs();
  }, [curPage, isDataChange]);

  return (
    <>
      <div className="flex space-x-2 mb-3">
        <Heading5 name="Favorite Jobs"></Heading5>
        <div className="font-normal text-xl text-gray-500">{`(${length})`}</div>
      </div>
      <div className="mt-5">
        {favoriteJobs.map((job) => (
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
            status={job.status}
          />
        ))}
      </div>
      <Pagination curPage={curPage} setCurPage={setCurPage} size={size} />
    </>
  );
}
