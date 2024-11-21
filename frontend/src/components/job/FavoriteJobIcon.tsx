import { GoBookmarkFill } from "react-icons/go";
import { UnfavoriteJobAPI } from "../../apis/favoriteJobAPI";
interface FavoriteJobIcon {
  jobId?: string;
  setIsFavoriteJob: (isFavoriteJob: boolean) => void;
}
export default function FavoriteJobIcon({
  jobId = "",
  setIsFavoriteJob = () => {},
}: FavoriteJobIcon) {
  async function favoriteJob(e: any) {
    e.preventDefault();
    const data = await UnfavoriteJobAPI(jobId);
    if (data.isSuccess) {
      setIsFavoriteJob(false);
    }
  }
  return (
    <GoBookmarkFill
      fontSize={"25px"}
      className="my-auto"
      color="var(--primary-500)"
      onClick={favoriteJob}
    />
  );
}
