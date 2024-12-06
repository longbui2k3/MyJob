import { useSelector } from "react-redux";
import { Editor } from "../Components";

export default function Interests() {
  const state = useSelector((state: any) => state.createCV.state);
  return (
    <div id="interests" className="flex flex-col gap-1">
      <Editor
        placeholder="Name"
        value={state?.interests?.name}
        readonly={true}
      />
      <Editor
        placeholder="Information"
        value={state?.interests?.content}
        readonly={true}
      />
    </div>
  );
}
