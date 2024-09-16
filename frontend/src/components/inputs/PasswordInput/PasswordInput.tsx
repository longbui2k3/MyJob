import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MessageError } from "../../global";
import BaseInput from "../Input/BaseInput";
interface PasswordInputProps {
  value: string | null;
  onChange: (e) => void;
  isEmptyPassword: boolean;
  placeholder?: string;
  className?: string;
}
export default function PasswordInput({
  value,
  onChange,
  isEmptyPassword,
  className = "",
  placeholder = "Password",
}: PasswordInputProps) {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const togglePassword = (e) => {
    setIsShowPassword(!isShowPassword);
  };
  return (
    <div className="relative w-full">
      <BaseInput
        type={isShowPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value || ""}
        className={`z-[1] ${className}`}
        onChange={onChange}
      />
      {isShowPassword ? (
        <AiOutlineEye
          className={
            "absolute text-[25px] right-[20px] top-2 z-[1] cursor-pointer"
          }
          onClick={togglePassword}
        />
      ) : (
        <AiOutlineEyeInvisible
          className={
            "absolute text-[25px] right-[20px] top-2 z-[1] cursor-pointer"
          }
          onClick={togglePassword}
        />
      )}
      {isEmptyPassword ? (
        <MessageError content="Please enter your password." />
      ) : (
        ""
      )}
    </div>
  );
}
