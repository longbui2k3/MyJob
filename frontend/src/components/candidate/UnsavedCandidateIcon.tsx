import { GoBookmark } from "react-icons/go";
import { SavedCandidateAPI } from "../../apis";
import { toastError, toastSuccess } from "../toast";

interface UnsavedCandidateIconProps {
  candidateId?: string;
  setIsSavedCandidate: (isSavedCandidate: boolean) => void;
}

export default function UnsavedCandidateIcon({
  candidateId = "",
  setIsSavedCandidate = () => {},
}: UnsavedCandidateIconProps) {
  async function savedCandidate(e: any) {
    e.preventDefault();
    const data = await SavedCandidateAPI(candidateId);
    if (data.isSuccess) {
      toastSuccess(data.message);
      setIsSavedCandidate(true);
    } else {
      toastError(data.message);
    }
  }
  return (
    <GoBookmark
      fontSize={"25px"}
      className="my-auto"
      color="var(--primary-500)"
      onClick={savedCandidate}
      style={{ cursor: "pointer" }}
    />
  );
}
