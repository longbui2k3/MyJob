import { useSelector } from "react-redux";
import { InputHeader, InputNormal } from "../Components";
import ReactQuill from "react-quill";

export default function Objective() {
  const state = useSelector((state: any) => state.createCV.state);

  return (
    <div
      id="objective"
      className="relative flex flex-col justify-between h-full"
    >
      <ReactQuill
        placeholder="Name"
        value={state?.objective?.name}
        modules={{ toolbar: false }}
      />
      <div></div>
      <ReactQuill
        placeholder="Your career goals, including short-term and long-term goals."
        value={state?.objective?.content}
        modules={{ toolbar: false }}
      />
    </div>
  );
}
