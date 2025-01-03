import { BaseSelect } from "../../select";
import { Heading5 } from "../../headings";
import BaseInput from "../../inputs/Input/BaseInput";
import { SalaryTypes } from "../../../helpers/constants";

interface SalaryProps {
  minSalary: number | null;
  maxSalary: number | null;
  salaryType: string;
  onMinSalaryChange: (value: number) => void;
  onMaxSalaryChange: (value: number) => void;
  onSalaryTypeChange: (value: string) => void;
}

export default function Salary({
  minSalary,
  maxSalary,
  salaryType,
  onMinSalaryChange,
  onMaxSalaryChange,
  onSalaryTypeChange,
}: SalaryProps) {
  const handleMinSalaryChange = (e) => {
    onMinSalaryChange(e.target.value);
  };
  const handleMaxSalaryChange = (e) => {
    onMaxSalaryChange(e.target.value);
  };

  return (
    <>
      <Heading5 name="Salary" />
      <div className="grid grid-cols-3 gap-4">
        <div>
          <BaseInput
            label="Min Salary"
            type="number"
            placeholder="Minimum salary..."
            value={minSalary}
            onChange={handleMinSalaryChange}
            currency="USD"
          />
        </div>
        <div>
          <BaseInput
            label="Max Salary"
            type="number"
            placeholder="Maximum salary..."
            value={maxSalary}
            onChange={handleMaxSalaryChange}
            currency="USD"
          />
        </div>
        <BaseSelect
          label="Salary Type"
          options={SalaryTypes}
          value={salaryType}
          onChange={onSalaryTypeChange}
        />
      </div>
    </>
  );
}
