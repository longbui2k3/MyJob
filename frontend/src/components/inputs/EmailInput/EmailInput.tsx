import { MessageError } from "../../global";
import BaseInput from "../Input/BaseInput";

interface EmailInputProps {
  value: string | null;
  onChange: (e) => void;
  isValidEmail: boolean;
  isEmptyEmail: boolean;
  className?: string;
}

export default function EmailInput({
  value,
  onChange,
  isValidEmail,
  isEmptyEmail,
  className = "",
}: EmailInputProps) {
  return (
    <div className="relative w-full">
      <BaseInput
        type="text"
        placeholder="Email address"
        value={value}
        onChange={onChange}
        className={`${className}`}
      />
      {isEmptyEmail ? (
        <MessageError content="Please enter your email." />
      ) : !isValidEmail ? (
        <MessageError content="This email is invalid. Make sure it's written like example@email.com." />
      ) : (
        ""
      )}
    </div>
  );
}
