import { useSelector } from "react-redux";
import { Editor } from "../Components";

export default function AdditionalInformation() {
  const state = useSelector((state: any) => state.createCV.state);
  return (
    <div id="additionalInformation" className="flex flex-col gap-1">
      <Editor
        placeholder="Name"
        value={state?.additionalInformation?.name}
        readonly={true}
      />
      <Editor
        placeholder="Information"
        value={state?.additionalInformation?.content}
        readonly={true}
      />
    </div>
  );
}
