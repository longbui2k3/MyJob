import { MaritalStatus } from "../../../helpers/constants";
import BaseSelect from "../BaseSelect";

interface MaritalStatusSelectProps {
  maritalStatus?: string;
  handleMaritalStatusChange: (value: string) => void;
}

export default function MaritalStatusSelect({
  maritalStatus,
  handleMaritalStatusChange,
}: MaritalStatusSelectProps) {
  return (
    <BaseSelect
      placeholder="Select marital status"
      label="Marital status"
      value={maritalStatus}
      onChange={handleMaritalStatusChange}
      options={MaritalStatus}
    />
  );
}
