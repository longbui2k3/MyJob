import { useDispatch, useSelector } from "react-redux";
import { setState } from "../../../features";
import ReactQuill from "react-quill";

export default function BusinessCard() {
  const state = useSelector((state: any) => state.createCV.state);
  const dispatch = useDispatch();

  return (
    <div id="business_card">
      <ReactQuill
        placeholder="Full Name"
        value={state?.fullName || ""}
        modules={{
          toolbar: false,
        }}
        onChange={(value) => dispatch(setState({ key: "fullName", value }))}
      />
      <ReactQuill
        placeholder="Position"
        value={state?.position || ""}
        modules={{ toolbar: false }}
        onChange={(value) => dispatch(setState({ key: "position", value }))}
      />
    </div>
  );
}
