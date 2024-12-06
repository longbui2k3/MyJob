import { useDispatch, useSelector } from "react-redux";
import { EditorProperty } from "../Components";
import { setState } from "../../../features";
export default function InterestsProperties() {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.createCV.state);
  return (
    <div id="interests" className="flex flex-col gap-[5px]">
      <EditorProperty
        placeholder="Name"
        value={state?.interests.name || ""}
        onChange={(value) => {
          dispatch(setState({ key: "interests.name", value }));
        }}
      />
      <EditorProperty
        placeholder="Information"
        value={state?.interests.content || ""}
        onChange={(value) => {
          dispatch(setState({ key: "interests.content", value }));
        }}
      />
    </div>
  );
}
