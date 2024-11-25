import { CiCirclePlus } from "react-icons/ci";
import { Heading6 } from "../headings";
import { Text } from "../text";
import { useDispatch } from "react-redux";
import { openFormResume, setType } from "../../features";

export default function CreateResume() {
  const dispatch = useDispatch();
  return (
    <div
      className="bg-[--gray-100] h-[70px] flex justify-between items-center p-[20px] rounded-sm cursor-pointer"
      onClick={() => {
        dispatch(setType("create"));
        dispatch(openFormResume());
      }}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <CiCirclePlus size={30} color={"var(--primary-500)"} />
          <div className="flex flex-col space-y-1 justify-between ml-[10px]">
            <Heading6 name={"Add CV/Resume"} />
            <Text className="text-[12px] mt-[0px]">
              Browse file or drop here only pdf
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
