import { Input } from "@chakra-ui/react";

interface InputBaseProps {
  type?: string;
  placeholder?: string;
  value?: string | null;
  onChange?: (e) => void;
  className?: string;
}

export default function BaseInput({
  type,
  placeholder,
  value,
  onChange,
  className,
}: InputBaseProps) {
  return (
    <Input
      type={type}
      placeholder={placeholder}
      height={`40px`}
      fontSize={"14px"}
      value={value || ""}
      onChange={onChange}
      className={`${className}`}
    />
  );
}
