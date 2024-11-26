import { GoBookmark } from "react-icons/go";
import { FavoriteJobAPI } from "../../apis/favoriteJobAPI";
import { StatusCodes } from "../../utils";
import { useNavigate } from "react-router-dom";
import { getRoute, SIGN_IN_KEY } from "../../helpers/constants";
interface FavoriteJobIcon {
  jobId?: string;
  setIsFavoriteJob: (isFavoriteJob: boolean) => void;
}
export default function UnfavoriteJobIcon({
  jobId = "",
  setIsFavoriteJob = () => {},
}: FavoriteJobIcon) {
  const navigate = useNavigate();
  async function favoriteJob(e: any) {
    e.preventDefault();
    const data = await FavoriteJobAPI(jobId);
    if (data.isSuccess) {
      setIsFavoriteJob(true);
    } else {
      if (data.status === StatusCodes.UNAUTHORIZED) {
        navigate(getRoute(SIGN_IN_KEY).path);
        navigate(0);
      }
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
