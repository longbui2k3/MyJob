import { Experiences } from "../../../helpers/constants";
import BaseSelect from "../BaseSelect";

interface ExperienceSelectProps {
  experience?: string;
  handleExperienceChange: (value: string) => void;
}

export default function ExperienceSelect({
  experience,
  handleExperienceChange,
}: ExperienceSelectProps) {
  return (
    <BaseSelect
      placeholder="Select experience"
      label="Experience"
      value={experience}
      onChange={handleExperienceChange}
      options={Experiences}
    />
  );
}
