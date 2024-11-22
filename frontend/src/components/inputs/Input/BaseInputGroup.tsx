import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
} from "@chakra-ui/react";
import { MessageError } from "../../global";

interface BaseInputGroupProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string | number | null;
  onChange?: (e) => void;
  icon?: JSX.Element;
  className?: string;
  required?: boolean;
  currency?: string;
}
export default function BaseInputGroup({
  label,
  type,
  placeholder,
  value,
  icon,
  currency,
  onChange,
  className,
  required = true,
}: BaseInputGroupProps) {
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
        {icon ? (
          <InputLeftElement pointerEvents="none">{icon}</InputLeftElement>
        ) : (
          ""
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
