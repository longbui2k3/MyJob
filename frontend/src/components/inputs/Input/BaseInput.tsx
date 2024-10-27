import { Input } from "@chakra-ui/react";

interface InputBaseProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string | null;
  onChange?: (e) => void;
  className?: string;
}

export default function BaseInput({
  label,
  type,
  placeholder,
  value,
  onChange,
  className,
}: InputBaseProps) {
  return (
    <>
      {label ? <div className="font-normal text-sm mb-2">{label}</div> : ""}
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
