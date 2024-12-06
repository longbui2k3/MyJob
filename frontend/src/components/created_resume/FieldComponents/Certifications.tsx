import { useSelector } from "react-redux";
import { Editor } from "../Components";

export default function Certifications() {
  const state = useSelector((state: any) => state.createCV.state);
  return (
    <div id="certifications" className="flex flex-col gap-1">
      <Editor
        placeholder="Name"
        value={state?.certifications?.name}
        readonly={true}
      />
      {state?.certifications.content.map((certification) => (
        <div className="flex flex-col gap-2">
          <Editor
            placeholder="Time"
            value={certification?.time}
            readonly={true}
          />
          <Editor
            placeholder="Certification Name"
            value={certification?.certificationName}
            readonly={true}
          />
        </div>
      ))}
    </div>
  );
}
