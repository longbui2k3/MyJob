import { useSelector } from "react-redux";
import { Editor } from "../Components";

export default function Activities() {
  const state = useSelector((state: any) => state.createCV.state);
  return (
    <div id="activities" className="flex flex-col gap-1">
      <Editor
        placeholder="Name"
        value={state?.activities?.name}
        readonly={true}
      />
      {state?.activities.content.map((activity) => (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <Editor
              placeholder="From"
              value={activity?.from}
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
              value={activity?.to}
              style={{
                width: "70px",
              }}
              readonly={true}
            />
          </div>
          <Editor
            placeholder="Organization Name"
            value={activity?.organizationName}
            readonly={true}
          />
          <Editor
            placeholder="Position"
            value={activity?.position}
            readonly={true}
          />
          <Editor
            placeholder="Activity Description"
            value={activity?.activityDescription}
            readonly={true}
          />
        </div>
      ))}
    </div>
  );
}
