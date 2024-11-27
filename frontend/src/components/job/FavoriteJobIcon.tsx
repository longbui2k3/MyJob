import { GoBookmarkFill } from "react-icons/go";
import { UnfavoriteJobAPI } from "../../apis/favoriteJobAPI";
import { StatusCodes } from "../../utils";
import { useNavigate } from "react-router-dom";
import { getRoute, SIGN_IN_KEY } from "../../helpers/constants";
import { useDispatch } from "react-redux";
import { setDataChange } from "../../features";
import { toastError, toastSuccess } from "../toast";
interface FavoriteJobIcon {
  jobId?: string;
  setIsFavoriteJob: (isFavoriteJob: boolean) => void;
}
export default function FavoriteJobIcon({
  jobId = "",
  setIsFavoriteJob = () => {},
}: FavoriteJobIcon) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function unfavoriteJob(e: any) {
    e.preventDefault();
    const data = await UnfavoriteJobAPI(jobId);
    if (data.isSuccess) {
      toastSuccess(data.message);
      setIsFavoriteJob(false);
      dispatch(setDataChange());
    } else {
      toastError(data.message);
      if (data.status === StatusCodes.UNAUTHORIZED) {
        navigate(getRoute(SIGN_IN_KEY).path);
        navigate(0);
      }
    }
  }
  return (
    <GoBookmarkFill
      fontSize={"25px"}
      className="my-auto"
      color="var(--primary-500)"
      onClick={unfavoriteJob}
    />
  );
}
