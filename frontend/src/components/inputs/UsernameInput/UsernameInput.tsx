import { MessageError } from "../../global";
import BaseInput from "../Input/BaseInput";

interface UsernameInputProps {
  value: string | null;
  onChange: (e) => void;
  isEmptyUsername: boolean;
  className?: string;
}

export default function UsernameInput({
  value,
  onChange,
  isEmptyUsername,
  className = "",
}: UsernameInputProps) {
  return (
    <div className="relative w-full">
      <BaseInput
        type="text"
        placeholder="Username"
        value={value || ""}
        onChange={onChange}
        className={`${className}`}
      />
      {isEmptyUsername ? (
        <MessageError content="Please enter your username." />
      ) : (
        ""
      )}
    </div>
  );
}
