import { UserTypes } from "../../../helpers/constants";
import BaseSelect from "../BaseSelect";

interface UserTypeSelectProps {
  userType?: string;
  handleUserTypeChange: (value: string) => void;
}

export default function UserUserTypeSelect({
  userType,
  handleUserTypeChange,
}: UserTypeSelectProps) {
  return (
    <BaseSelect
      placeholder="User Type"
      label=""
      value={userType}
      onChange={handleUserTypeChange}
      options={Object.values(UserTypes)}
    />
  );
}
