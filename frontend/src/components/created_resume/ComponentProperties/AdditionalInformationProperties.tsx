import { useDispatch, useSelector } from "react-redux";
import { EditorProperty } from "../Components";
import { setState } from "../../../features";
export default function AdditionalInformationProperties() {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.createCV.state);
  return (
    <div id="additionalInformation" className="flex flex-col gap-[5px]">
      <EditorProperty
        placeholder="Name"
        value={state?.additionalInformation.name || ""}
        onChange={(value) => {
          dispatch(setState({ key: "additionalInformation.name", value }));
        }}
      />
      <EditorProperty
        placeholder="Information"
        value={state?.additionalInformation.content || ""}
        onChange={(value) => {
          dispatch(setState({ key: "additionalInformation.content", value }));
        }}
      />
    </div>
  );
}
