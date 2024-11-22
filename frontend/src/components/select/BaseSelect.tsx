import { Select } from "@chakra-ui/react";
import { MessageError } from "../global";

interface BaseSelectProps {
  width?: string;
  label?: string;
  options: string[];
  className?: string;
  value?: string;
  required?: boolean;
  onChange: (value: string) => void;
}

export default function BaseSelect({
  width,
  label,
  options,
  className,
  value,
  required = true,
  onChange,
}: BaseSelectProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };
  return (
    <div className={`${className}`}>
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
      <Select
        placeholder="Select..."
        onChange={handleChange}
        value={value}
        width={width}
        fontSize={"14px"}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </div>
  );
}
