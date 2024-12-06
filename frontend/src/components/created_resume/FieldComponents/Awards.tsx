import { useSelector } from "react-redux";
import { Editor } from "../Components";

export default function Awards() {
  const state = useSelector((state: any) => state.createCV.state);
  return (
    <div id="awards" className="flex flex-col gap-1">
      <Editor placeholder="Name" value={state?.awards?.name} readonly={true} />
      {state?.awards.content.map((award) => (
        <div className="flex flex-col gap-2">
          <Editor placeholder="Time" value={award?.time} readonly={true} />
          <Editor
            placeholder="Award Name"
            value={award?.awardName}
            readonly={true}
          />
        </div>
      ))}
    </div>
  );
}
