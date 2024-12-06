import { useSelector } from "react-redux";
import { Editor } from "../Components";

export default function Skills() {
  const state = useSelector((state: any) => state.createCV.state);
  return (
    <div id="skills" className="flex flex-col gap-3">
      <Editor placeholder="Name" value={state?.skills?.name} readonly={true} />
      {state?.skills.content.map((skill) => (
        <div className="flex flex-col gap-2">
          <Editor
            placeholder="Skill Name"
            value={skill?.skillName}
            readonly={true}
          />
          <Editor
            placeholder="Skill Description"
            value={skill?.skillDescription}
            readonly={true}
          />
        </div>
      ))}
    </div>
  );
}
