import { Select, Text } from "@chakra-ui/react";

interface BaseSelectProps {
  text?: string;
  options: { value: string; label: string }[];
  className?: string;
  onChange: (value: string) => void;
}

export default function BaseSelect({
  text,
  options,
  className = "",
  onChange,
}: BaseSelectProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };
  return (
    <div>
      <Text className={`mb-2 ${className}`}>{text}</Text>
      <Select placeholder="Select..." onChange={handleChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  );
}
