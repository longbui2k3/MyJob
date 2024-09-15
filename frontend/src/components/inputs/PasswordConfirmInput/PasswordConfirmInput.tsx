import { Input } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MessageError } from "../../global";
import BaseInput from "../Input/BaseInput";
interface PasswordConfirmInputProps {
  value: string | null;
  onChange: (e) => void;
  isEmptyPasswordConfirm: boolean;
  className?: string;
}
export default function PasswordConfirmInput({
  value,
  onChange,
  isEmptyPasswordConfirm,
  className = "",
}: PasswordConfirmInputProps) {
  const [isShowPasswordConfirm, setIsShowPasswordConfirm] = useState(false);
  const togglePasswordConfirm = (e) => {
    setIsShowPasswordConfirm(!isShowPasswordConfirm);
  };
  return (
    <div className="relative w-full">
      <BaseInput
        type={isShowPasswordConfirm ? "text" : "password"}
        placeholder="Confirm password"
        value={value || ""}
        className={`z-[1] ${className}`}
        onChange={onChange}
      />
      {isShowPasswordConfirm ? (
        <AiOutlineEye
          className={
            "absolute text-[25px] right-[20px] top-2 z-[1] cursor-pointer"
          }
          onClick={togglePasswordConfirm}
        />
      ) : (
        <AiOutlineEyeInvisible
          className={
            "absolute text-[25px] right-[20px] top-2 z-[1] cursor-pointer"
          }
          onClick={togglePasswordConfirm}
        />
      )}
      {isEmptyPasswordConfirm ? (
        <MessageError content="Please enter your confirm password." />
      ) : (
        ""
      )}
    </div>
  );
}
