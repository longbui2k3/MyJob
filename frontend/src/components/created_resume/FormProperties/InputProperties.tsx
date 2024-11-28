import { FormLabel, Input } from "@chakra-ui/react";

interface InputPropertiesProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: any) => void;
}

export default function InputProperties({
  label = "",
  placeholder = "",
  value = "",
  onChange = () => {},
}: InputPropertiesProps) {
  return (
    <div>
      <FormLabel>{label}</FormLabel>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
