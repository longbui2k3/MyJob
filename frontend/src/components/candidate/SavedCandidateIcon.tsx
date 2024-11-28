import { GoBookmarkFill } from "react-icons/go";
import { UnsavedCandidateAPI } from "../../apis";
import { toastError, toastSuccess } from "../toast";
import { useDispatch } from "react-redux";
import { setDataChange } from "../../features";

interface SavedCandidateIconProps {
  candidateId?: string;
  setIsSavedCandidate: (isSavedCandidate: boolean) => void;
}

export default function SavedCandidateIcon({
  candidateId = "",
  setIsSavedCandidate = () => {},
}: SavedCandidateIconProps) {
  const dispatch = useDispatch();

  async function unsavedCandidate(e: any) {
    e.preventDefault();
    const data = await UnsavedCandidateAPI(candidateId);
    if (data.isSuccess) {
      toastSuccess(data.message);
      setIsSavedCandidate(false);
      dispatch(setDataChange());
    } else {
      toastError(data.message);
    }
  }
  return (
    <GoBookmarkFill
      fontSize={"25px"}
      className="my-auto"
      color="var(--primary-500)"
      onClick={unsavedCandidate}
    />
  );
}
