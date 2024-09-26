import { Select, Text } from "@chakra-ui/react";

interface BaseSelectProps {
  text?: string;
  options: { value: string; label: string }[];
}

export default function BaseSelect({ text, options }: BaseSelectProps) {
  return (
    <div>
      <Text className="mb-2">{text}</Text>
      <Select placeholder="Select...">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  );
}
