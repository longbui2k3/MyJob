import { Input, InputGroup, InputRightAddon, Text } from "@chakra-ui/react";
import { BaseSelect } from "../../select";
import { Heading5 } from "../../headings";

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
          <Text className="font-normal text-sm mb-2">Min Salary</Text>
          <InputGroup>
            <Input
              type="number"
              placeholder="Minimum salary..."
              value={minSalary}
              onChange={handleMinSalaryChange}
            />
            <InputRightAddon pointerEvents="none" color="var(--gray-600)">
              VND
            </InputRightAddon>
          </InputGroup>
        </div>
        <div>
          <Text className="font-normal text-sm mb-2">Max Salary</Text>
          <InputGroup>
            <Input
              type="number"
              placeholder="Maximum salary..."
              value={maxSalary}
              onChange={handleMaxSalaryChange}
            />
            <InputRightAddon pointerEvents="none" color="var(--gray-600)">
              VND
            </InputRightAddon>
          </InputGroup>
        </div>
        <BaseSelect
          label="Salary Type"
          options={["Hour", "Week", "Month", "Year"]}
          value={salaryType}
          onChange={onSalaryTypeChange}
        />
      </div>
    </>
  );
}
