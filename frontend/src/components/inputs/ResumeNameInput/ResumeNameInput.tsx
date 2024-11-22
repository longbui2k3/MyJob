import { MessageError } from "../../global";
import BaseInput from "../Input/BaseInput";

interface ResumeNameInputProps {
  label?: string;
  value: string | null;
  onChange: (e) => void;
  isEmptyResumeName: boolean;
  className?: string;
}

export default function ResumeNameInput({
  value,
  onChange,
  isEmptyResumeName,
  className = "",
}: ResumeNameInputProps) {
  return (
    <div className="relative w-full">
      <BaseInput
        label="Resume Name"
        type="text"
        placeholder="Resume Name"
        value={value}
        onChange={onChange}
        className={`${className}`}
      />
      {isEmptyResumeName ? (
        <MessageError content="Please enter your resume name." />
      ) : (
        ""
      )}
    </div>
  );
}
