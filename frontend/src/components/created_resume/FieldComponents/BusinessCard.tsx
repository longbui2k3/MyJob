import { useSelector } from "react-redux";
import { Editor } from "../Components";
import { useRef } from "react";

export default function BusinessCard() {
  const state = useSelector((state: any) => state.createCV.state);
  const fullNameRef = useRef<any>(null);
  const positionRef = useRef<any>(null);

  return (
    <div id="business_card" className="flex flex-col justify-between">
      <Editor
        placeholder="Full Name"
        value={state?.fullName || ""}
        ref={fullNameRef}
        readonly={true}
      />
      <Editor
        placeholder="Position"
        value={state?.position || ""}
        ref={positionRef}
        readonly={true}
      />
    </div>
  );
}
