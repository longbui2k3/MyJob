import { useSelector } from "react-redux";
import { Editor } from "../Components";

export default function WorkExperience() {
  const state = useSelector((state: any) => state.createCV.state);
  return (
    <div
      id="work_experience"
      className="relative flex flex-col justify-between gap-4 h-fit"
    >
      <Editor
        placeholder="Name"
        value={state?.workExperience?.name}
        readonly={true}
      />
      {state?.workExperience?.content.map((content) => (
        <div className="flex gap-3">
          <div className="w-[25%] flex flex-col gap-2">
            <Editor
              placeholder="Company Name"
              value={content?.companyName}
              readonly={true}
            />
            <div className="flex items-center gap-1">
              <Editor
                placeholder="From"
                value={content?.from}
                style={{
                  width: "70px",
                }}
                readonly={true}
              />
              <div
                style={{
                  paddingTop: "0px",
                  fontSize: "13px",
                }}
              >
                {"-"}
              </div>
              <Editor
                placeholder="To"
                value={content?.to}
                style={{
                  width: "70px",
                }}
                readonly={true}
              />
            </div>
          </div>
          <div className="relative">
            <div
              style={{
                height: "calc(100% - 7px)",
                width: "2px",
                display: "block",
                position: "absolute",
                left: "-2px",
                border: "0.5px dashed rgb(85, 85, 85)",
                top: "7px",
              }}
            ></div>
            <div
              style={{
                width: "10px",
                height: "10px",
                position: "absolute",
                display: "block",
                top: "0px",
                left: "-6px",
                borderRadius: "50%",
                backgroundColor: "rgb(0, 0, 0)",
              }}
            ></div>
          </div>
          <div className="w-[75%] flex flex-col gap-2">
            <Editor
              placeholder="Position"
              value={content?.position}
              readonly={true}
            />
            <Editor
              placeholder="Experience Description"
              value={content?.experienceDescription}
              readonly={true}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
