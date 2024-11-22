import { UserGenders } from "../../../helpers/constants";
import BaseSelect from "../BaseSelect";

interface GenderSelectProps {
  gender?: string;
  handleGenderChange: (value: string) => void;
}

export default function GenderSelect({
  gender,
  handleGenderChange,
}: GenderSelectProps) {
  return (
    <BaseSelect
      placeholder="Select gender"
      label="Gender"
      value={gender}
      onChange={handleGenderChange}
      options={UserGenders}
    />
  );
}
