import { useSelector } from "react-redux";
import { Editor } from "../Components";

export default function Referrers() {
  const state = useSelector((state: any) => state.createCV.state);
  return (
    <div id="referrers" className="flex flex-col gap-1">
      <Editor
        placeholder="Name"
        value={state?.referrers?.name}
        readonly={true}
      />
      <Editor
        placeholder="Information"
        value={state?.referrers?.content}
        readonly={true}
      />
    </div>
  );
}
