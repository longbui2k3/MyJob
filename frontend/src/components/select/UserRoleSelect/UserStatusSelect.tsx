import { UserStatuses } from "../../../helpers/constants";
import BaseSelect from "../BaseSelect";

interface UserStatusSelectProps {
  userStatus?: string;
  handleUserStatusChange: (value: string) => void;
}

export default function UserUserStatusSelect({
  userStatus,
  handleUserStatusChange,
}: UserStatusSelectProps) {
  return (
    <BaseSelect
      placeholder="User Status"
      label=""
      value={userStatus}
      onChange={handleUserStatusChange}
      options={Object.values(UserStatuses)}
    />
  );
}
