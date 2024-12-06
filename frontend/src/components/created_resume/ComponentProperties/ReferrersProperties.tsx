import { useDispatch, useSelector } from "react-redux";
import { EditorProperty } from "../Components";
import { setState } from "../../../features";
export default function BusinessCardProperties() {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.createCV.state);
  return (
    <div id="referrers" className="flex flex-col gap-[5px]">
      <EditorProperty
        placeholder="Name"
        value={state?.referrers.name || ""}
        onChange={(value) => {
          dispatch(setState({ key: "referrers.name", value }));
        }}
      />
      <EditorProperty
        placeholder="Information"
        value={state?.referrers.content || ""}
        onChange={(value) => {
          dispatch(setState({ key: "referrers.content", value }));
        }}
      />
    </div>
  );
}
