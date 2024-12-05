import { Pagination, usePagination } from "../global";
import { useEffect, useState } from "react";
import { FindSavedCandidatesByUser } from "../../apis";
import { useSelector } from "react-redux";
import CandidateRowsFill from "./CandidateRowsFill";

export default function SavedCandidate() {
  const { curPage, setCurPage } = usePagination();
  const [size, setSize] = useState(1);
  const [savedCandidates, setSavedCandidates] = useState<Array<any>>([]);
  const isDataChange = useSelector(
    (state: any) => state.changeData.isDataChange
  );

  async function findSavedCandidates() {
    const data = await FindSavedCandidatesByUser({
      page: curPage,
      limit: 10,
    });
    if (data.isSuccess) {
      setSavedCandidates(data.metadata.savedCandidates);
      setSize(data.metadata.meta.size);
    }
  }
  useEffect(() => {
    findSavedCandidates();
  }, [curPage, isDataChange]);
  return (
    <>
      {savedCandidates.map((candidate) => (
        <CandidateRowsFill
          _id={candidate._id}
          avatar={candidate.profile.avatar}
          fullName={candidate.profile.fullName}
          title={candidate.profile.title}
          provinceCode={candidate.profile.provinceCode}
          experience={candidate.profile.experience}
        />
      ))}
      <Pagination curPage={curPage} setCurPage={setCurPage} size={size} />
    </>
  );
}
