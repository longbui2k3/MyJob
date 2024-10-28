import { Text } from "@chakra-ui/react";
import BaseInput from "../Input/BaseInput";

interface CompanyNameInputProps {
  value?: string;
  onChange: (e) => void;
  className?: string;
}

export default function CompanyNameInput({
  value,
  onChange,
  className = "",
}: CompanyNameInputProps) {
  return (
    <div className="relative w-full">
      <Text className="font-normal text-sm mb-2">Company name</Text>
      <BaseInput
        type="text"
        value={value}
        onChange={onChange}
        className={`${className}`}
      />
    </div>
  );
}
