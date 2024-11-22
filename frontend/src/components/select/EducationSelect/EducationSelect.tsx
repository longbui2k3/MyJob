import { Educations } from "../../../helpers/constants";
import BaseSelect from "../BaseSelect";

interface EducationSelectProps {
  education?: string;
  handleEducationChange: (value: string) => void;
}

export default function EducationSelect({
  education,
  handleEducationChange,
}: EducationSelectProps) {
  return (
    <BaseSelect
      placeholder="Select education"
      label="Education"
      value={education}
      onChange={handleEducationChange}
      options={Educations}
    />
  );
}
