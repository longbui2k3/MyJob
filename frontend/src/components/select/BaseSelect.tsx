import { Select } from "@chakra-ui/react";

interface BaseSelectProps {
  width?: string;
  label?: string;
  options: string[];
  className?: string;
  value?: string;
  onChange: (value: string) => void;
}

export default function BaseSelect({
  width,
  label,
  options,
  className,
  value,
  onChange,
}: BaseSelectProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };
  return (
    <div className={`${className}`}>
      {label ? <div className="font-normal text-sm mb-2">{label}</div> : ""}
      <Select
        placeholder="Select..."
        onChange={handleChange}
        value={value}
        width={width}
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
