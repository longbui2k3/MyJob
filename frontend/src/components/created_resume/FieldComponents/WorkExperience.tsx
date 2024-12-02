import { useSelector } from "react-redux";
import ReactQuill from "react-quill";

export default function WorkExperience() {
  const state = useSelector((state: any) => state.createCV.state);
  return (
    <div
      id="work_experience"
      className="relative flex flex-col justify-between gap-4 h-full"
    >
      <ReactQuill
        placeholder="Name"
        value={state?.workExperience?.name}
        modules={{ toolbar: false }}
      />
      {state?.workExperience?.content.map((content) => (
        <div className="flex gap-3">
          <div className="w-[25%] flex flex-col gap-2">
            <ReactQuill
              placeholder="Company Name"
              value={content?.companyName}
              modules={{ toolbar: false }}
            />
            <div className="flex items-center gap-1">
              <ReactQuill
                placeholder="From"
                value={content?.from}
                modules={{ toolbar: false }}
                style={{
                  width: "100%",
                }}
              />
              <div
                style={{
                  paddingTop: "0px",
                  fontSize: "13px",
                }}
              >
                {"-"}
              </div>
              <ReactQuill
                placeholder="To"
                value={content?.to}
                modules={{ toolbar: false }}
                style={{
                  width: "100%",
                }}
              />
            </div>
          </div>
          <div className="relative">
            <div
              style={{
                height: "calc(100% - 2px)",
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
            <ReactQuill
              placeholder="Position"
              value={content?.position}
              modules={{ toolbar: false }}
            />
            <ReactQuill
              placeholder="Experience Description"
              value={content?.experienceDescription}
              modules={{ toolbar: false }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
