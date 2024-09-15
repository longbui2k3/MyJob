import { MessageError } from "../../global";
import BaseInput from "../Input/BaseInput";

interface FullNameInputProps {
  value: string | null;
  onChange: (e) => void;
  isEmptyFullName: boolean;
  className?: string;
}

export default function FullNameInput({
  value,
  onChange,
  isEmptyFullName,
  className = "",
}: FullNameInputProps) {
  return (
    <div className="relative w-full">
      <BaseInput
        type="text"
        placeholder="Full Name"
        value={value}
        onChange={onChange}
        className={`${className}`}
      />
      {isEmptyFullName ? (
        <MessageError content="Please enter your full name." />
      ) : (
        ""
      )}
    </div>
  );
}
