import { useSelector } from "react-redux";
import { Editor } from "../Components";

export default function Education() {
  const state = useSelector((state: any) => state.createCV.state);
  return (
    <div
      id="education"
      className="relative flex flex-col justify-between gap-4 h-fit"
    >
      <Editor
        placeholder="Name"
        value={state?.education?.name}
        readonly={true}
      />
      {state?.education.content.map((education) => (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <Editor
              placeholder="From"
              value={education?.from}
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
              value={education?.to}
              style={{
                width: "70px",
              }}
              readonly={true}
            />
          </div>
          <Editor
            placeholder="Courses"
            value={education?.courses}
            readonly={true}
          />
          <Editor
            placeholder="School Name"
            value={education?.schoolName}
            readonly={true}
          />
          <Editor
            placeholder="Education Description"
            value={education?.educationDescription}
            readonly={true}
          />
        </div>
      ))}
    </div>
  );
}
