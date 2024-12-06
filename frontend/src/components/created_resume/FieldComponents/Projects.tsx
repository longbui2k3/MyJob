import { useSelector } from "react-redux";
import { Editor } from "../Components";

export default function Projects() {
  const state = useSelector((state: any) => state.createCV.state);
  return (
    <div
      id="projects"
      className="relative flex flex-col justify-between gap-4 h-fit"
    >
      <Editor
        placeholder="Name"
        value={state?.projects?.name}
        readonly={true}
      />
      {state?.projects.content.map((project) => (
        <div className="flex gap-3">
          <div className="w-[25%] flex flex-col gap-2">
            <Editor
              placeholder="Project name"
              value={project?.projectName}
              readonly={true}
            />
            <div className="flex items-center gap-1">
              <Editor
                placeholder="From"
                value={project?.from}
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
                value={project?.to}
                style={{
                  width: "70px",
                }}
                readonly={true}
              />
            </div>
            <Editor
              placeholder="Name of customer"
              value={project?.nameOfCustomer}
              readonly={true}
            />
            <Editor
              placeholder="Team size"
              value={project?.teamSize}
              readonly={true}
            />
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
              value={project?.position}
              readonly={true}
            />
            <Editor
              placeholder="Responsibility"
              value={project?.responsibility}
              readonly={true}
            />
            <Editor
              placeholder="Technologies"
              value={project?.technologies}
              readonly={true}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
