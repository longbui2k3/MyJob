import { MessageError } from "../../global";
import BaseInput from "../Input/BaseInput";

interface VerifyCodeInputProps {
  value: string | null;
  onChange: (e) => void;
  isEmptyVerifyCode: boolean;
  className?: string;
}

export default function VerifyCodeInput({
  value,
  onChange,
  isEmptyVerifyCode,
  className = "",
}: VerifyCodeInputProps) {
  return (
    <div className="relative w-full">
      <BaseInput
        type="text"
        placeholder="Verification Code"
        value={value}
        onChange={onChange}
        className={`${className}`}
      />
      {isEmptyVerifyCode ? (
        <MessageError content="Please enter your verification code." />
      ) : (
        ""
      )}
    </div>
  );
}
