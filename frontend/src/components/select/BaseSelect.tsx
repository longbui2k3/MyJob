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
  placeholder?: string;
}

export default function BaseSelect({
  width,
  label,
  options,
  className,
  value,
  required = true,
  onChange,
  placeholder = "Select...",
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
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        width={width}
        fontSize={"14px"}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option[0].toUpperCase() + option.slice(1)}
          </option>
        ))}
      </Select>
    </div>
  );
}
