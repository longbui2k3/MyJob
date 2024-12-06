import { EditorProperty } from "../Components";
import { setState } from "../../../features";
import { useDispatch, useSelector } from "react-redux";

export default function ObjectiveProperties() {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.createCV.state);
  return (
    <div id="objective" className="flex flex-col gap-[5px]">
      <EditorProperty
        placeholder="Objective Header"
        value={state?.objective?.name || ""}
        onChange={(value) => {
          dispatch(setState({ key: "objective.name", value }));
        }}
      />
      <EditorProperty
        placeholder="Objective Content"
        value={state?.objective?.content || ""}
        onChange={(value) => {
          dispatch(setState({ key: "objective.content", value }));
        }}
      />
    </div>
  );
}
