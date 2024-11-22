import { Input } from "@chakra-ui/react";
import { MessageError } from "../../global";

interface InputBaseProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string | number | null;
  onChange?: (e) => void;
  className?: string;
  required?: boolean;
}

export default function BaseInput({
  label,
  type,
  placeholder,
  value,
  onChange,
  className,
  required = true,
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
      <Input
        type={type}
        placeholder={placeholder}
        height={`40px`}
        fontSize={"14px"}
        value={value || ""}
        onChange={onChange}
        className={`${className}`}
      />
    </>
  );
}
