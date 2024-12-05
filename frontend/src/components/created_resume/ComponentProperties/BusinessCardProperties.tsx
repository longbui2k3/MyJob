import { useDispatch, useSelector } from "react-redux";
import { EditorProperty } from "../Components";
import { setState } from "../../../features";
export default function BusinessCardProperties() {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.createCV.state);
  return (
    <div id="business_card" className="flex flex-col gap-[5px]">
      <EditorProperty
        placeholder="Full Name"
        value={state?.fullName || ""}
        onChange={(value) => {
          dispatch(setState({ key: "fullName", value }));
        }}
      />
      <EditorProperty
        placeholder="Position"
        value={state?.position || ""}
        onChange={(value) => {
          dispatch(setState({ key: "position", value }));
        }}
      />
    </div>
  );
}
