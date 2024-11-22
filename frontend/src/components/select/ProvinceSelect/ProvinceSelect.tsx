import { Select } from "@chakra-ui/react";
import provinces from "../../../data/provinces.json";
interface ProvinceSelectProps {
  provinceCode?: number;
  handleProvinceCodeChange: (value: number) => void;
}

export default function ProvinceSelect({
  provinceCode,
  handleProvinceCodeChange,
}: ProvinceSelectProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleProvinceCodeChange(Number(e.target.value));
  };
  return (
    <div className={``}>
      <div className="font-normal text-sm mb-2">{"Province"}</div>
      <Select
        placeholder={"Select province"}
        onChange={handleChange}
        value={provinceCode}
      >
        {provinces.map((option, i) => (
          <option key={i} value={option.code}>
            {option.english_name}
          </option>
        ))}
      </Select>
    </div>
  );
}
