import { GoBookmark } from "react-icons/go";
import { FavoriteJobAPI } from "../../apis/favoriteJobAPI";
interface FavoriteJobIcon {
  jobId?: string;
  setIsFavoriteJob: (isFavoriteJob: boolean) => void;
}
export default function UnfavoriteJobIcon({
  jobId = "",
  setIsFavoriteJob = () => {},
}: FavoriteJobIcon) {
  async function favoriteJob(e: any) {
    e.preventDefault();
    const data = await FavoriteJobAPI(jobId);
    if (data.isSuccess) {
      setIsFavoriteJob(true);
    }
  }
  return (
    <GoBookmark
      fontSize={"25px"}
      className="my-auto"
      color="var(--primary-500)"
      onClick={favoriteJob}
    />
  );
}
