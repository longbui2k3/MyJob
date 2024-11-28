import { CiCirclePlus } from "react-icons/ci";
import { Heading6 } from "../headings";
import { useNavigate } from "react-router-dom";
import { CREATE_CV_KEY, getRoute } from "../../helpers/constants";

export default function CreateResume() {
  const navigate = useNavigate();
  return (
    <div
      className="bg-[--gray-100] h-[150px] flex justify-center items-center p-[20px] rounded-sm cursor-pointer"
      onClick={() => {
        navigate(getRoute(CREATE_CV_KEY).path);
      }}
    >
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col items-center">
          <CiCirclePlus size={40} color={"var(--primary-500)"} />
          <div className="flex justify-center mt-3">
            <Heading6 name={"Create CV/Resume"} />
          </div>
        </div>
      </div>
    </div>
  );
}
