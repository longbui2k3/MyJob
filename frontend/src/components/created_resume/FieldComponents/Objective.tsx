import { useSelector } from "react-redux";
import { Editor } from "../Components";
import CustomEditor from "../CustomToolbar";

export default function Objective() {
  const state = useSelector((state: any) => state.createCV.state);

  return (
    <div
      id="objective"
      className="relative flex flex-col justify-between h-full"
    >
      <Editor
        placeholder="Name"
        value={state?.objective?.name}
        readonly={true}
      />

      <Editor
        placeholder="Your career goals, including short-term and long-term goals."
        value={state?.objective?.content}
        readonly={true}
        style={{
          marginTop: "30px",
        }}
      />
    </div>
  );
}
