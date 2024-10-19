import { useDispatch } from "react-redux";
import { closeForm } from "../../features";
import { FaXmark } from "react-icons/fa6";
import { Heading5 } from "../headings";

interface OutsideFormProps {
  children?: JSX.Element | string;
  onSubmit?: () => void;
  width?: string;
  height?: string;
}

export default function OutsideForm({
  children = <></>,
  onSubmit = () => {},
  width = "500px",
  height = "550px",
}: OutsideFormProps) {
  const dispatch = useDispatch();
  return (
    <div
      className="absolute backdrop-brightness-[0.6] w-full h-screen z-[1001] flex flex-col justify-center text-white"
      onClick={() => {
        dispatch(closeForm());
      }}
    >
      <form
        className="relative mx-auto bg-[white] px-6 py-6 rounded-2xl z-[1002]"
        style={{
          width,
          height,
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onSubmit={onSubmit}
      >
        <Heading5 name="Create Category" />
        <FaXmark
          className="absolute right-[26px] top-[26px] text-[20px] text-[--gray-200]"
          onClick={function (e) {
            dispatch(closeForm());
          }}
        />
        {children}
      </form>
    </div>
  );
}
