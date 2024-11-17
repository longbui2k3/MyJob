import { Select, Text } from "@chakra-ui/react";

interface BaseSelectProps {
  text?: string;
  options: string[];
  className?: string;
  value?: string;
  onChange: (value: string) => void;
}

export default function BaseSelect({
  text,
  options,
  className = "",
  value,
  onChange,
}: BaseSelectProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };
  return (
    <div>
      <Text className={`mb-2 ${className}`}>{text}</Text>
      <Select placeholder="Select..." onChange={handleChange} value={value}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </div>
  );
}
