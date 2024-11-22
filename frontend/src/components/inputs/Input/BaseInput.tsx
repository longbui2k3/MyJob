import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface InputBaseProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string | number | null;
  onChange?: (e) => void;
  className?: string;
  LeftIcon?: IconType;
}

export default function BaseInput({
  label,
  type,
  placeholder,
  value,
  onChange,
  className,
  LeftIcon,
}: InputBaseProps) {
  return (
    <>
      {label ? <div className="font-normal text-sm mb-2">{label}</div> : ""}
      <InputGroup>
        {LeftIcon && (
          <InputLeftElement pointerEvents="none">
            <LeftIcon color="var(--primary-500)" size={20} />
          </InputLeftElement>
        )}
        <Input
          type={type}
          placeholder={placeholder}
          height={`40px`}
          fontSize={"14px"}
          value={value || ""}
          onChange={onChange}
          className={`${className}`}
        />
      </InputGroup>
    </>
  );
}
