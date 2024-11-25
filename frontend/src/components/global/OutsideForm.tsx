import { useDispatch } from "react-redux";
import { FaXmark } from "react-icons/fa6";
import { Heading5 } from "../headings";

interface OutsideFormProps {
  children?: JSX.Element | string;
  onSubmit?: (e) => void;
  outsideWidth?: string;
  outsideHeight?: string;
  width?: string;
  height?: string;
  closeForm: any;
  header?: string;
}

export default function OutsideForm({
  children = <></>,
  onSubmit = () => {},
  outsideWidth = "100%",
  outsideHeight = "100%",
  width = "500px",
  height = "550px",
  closeForm = () => {},
  header = "Create Category",
}: OutsideFormProps) {
  const dispatch = useDispatch();
  return (
    <div
      className="fixed top-0 right-0 bottom-0 left-0 overflow-auto backdrop-brightness-[0.6] z-[1001] flex flex-col justify-center"
      onClick={() => {
        dispatch(closeForm());
      }}
      style={{
        width: outsideWidth,
        height: outsideHeight,
      }}
    >
      <form
        className="relative mx-auto bg-[white] px-6 py-6 rounded-2xl z-[1002] space-y-4"
        style={{
          width,
          height,
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onSubmit={onSubmit}
      >
        <Heading5 name={header} />
        <FaXmark
          className="absolute right-[26px] top-[16px] text-[20px] text-[--gray-200]"
          onClick={function (e) {
            dispatch(closeForm());
          }}
        />
        {children}
      </form>
    </div>
  );
}
