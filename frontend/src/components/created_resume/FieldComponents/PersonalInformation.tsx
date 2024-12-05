import { useSelector } from "react-redux";
import { Editor } from "../Components";
import { TfiEmail } from "react-icons/tfi";
import { FaInfoCircle, FaPhoneAlt } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { useRef } from "react";

export default function PersonalInformation() {
  const state = useSelector((state: any) => state.createCV.state);
  const emailRef = useRef<any>(null);
  const phoneRef = useRef<any>(null);
  const locationRef = useRef<any>(null);
  return (
    <div id="personal_information" className="flex flex-col gap-1">
      <div className="flex w-full items-center px-[5px]">
        <TfiEmail />
        <div className="flex-grow">
          <Editor
            placeholder="Email"
            value={state?.email || ""}
            readonly={true}
            height="30px"
            ref={emailRef}
          />
        </div>
      </div>
      <div className="flex w-full items-center px-[5px]">
        <FaPhoneAlt />
        <div className="flex-grow">
          <Editor
            placeholder="Phone"
            value={state?.phone || ""}
            readonly={true}
            height="30px"
            ref={phoneRef}
          />
        </div>
      </div>
      <div className="flex w-full items-center px-[5px]">
        <MdLocationPin />
        <div className="flex-grow">
          <Editor
            placeholder="Location"
            value={state?.location || ""}
            readonly={true}
            height="30px"
            ref={locationRef}
          />
        </div>
      </div>
      {(state.informations || []).map((information) => (
        <div className="flex w-full items-center px-[5px]">
          <FaInfoCircle />
          <div className="flex-grow">
            <Editor
              placeholder="Information"
              value={information || ""}
              readonly={true}
              height="30px"
              ref={locationRef}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
