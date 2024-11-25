import { Input, InputRightAddon } from "@chakra-ui/react";
import { MessageError } from "../../global";
import { InputGroup, InputLeftElement } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface InputBaseProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string | number | null;
  onChange?: (e) => void;
  className?: string;
  required?: boolean;
  LeftIcon?: IconType;
  currency?: string;
}

export default function BaseInput({
  label,
  type,
  placeholder,
  value,
  onChange,
  className,
  required = true,
  LeftIcon,
  currency,
}: InputBaseProps) {
  return (
    <>
      {label ? (
        <div className="flex space-x-2">
          <div className="font-normal text-sm mb-2 whitespace-nowrap">
            {label}
          </div>
          {required ? <MessageError content="*" /> : ""}
        </div>
      ) : (
        ""
      )}
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
        {currency ? (
          <InputRightAddon pointerEvents="none" color="var(--gray-600)">
            VND
          </InputRightAddon>
        ) : (
          ""
        )}
      </InputGroup>
    </>
  );
}
