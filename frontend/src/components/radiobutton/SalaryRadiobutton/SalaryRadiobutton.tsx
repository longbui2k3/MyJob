import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { Heading } from "../../headings";
import { Salaries } from "../../../helpers/constants";

interface SalaryRadioProps {
  salary?: string;
  setSalary?: (salaries: string) => void;
}

export default function SalaryRadiobutton({
  salary = "",
  setSalary = () => {},
}: SalaryRadioProps) {
  return (
    <>
      <Heading size={17} name="Salary" className="font-semibold" />

      <RadioGroup
        value={salary}
        onChange={(salary: string) => {
          setSalary(salary);
        }}
      >
        <Stack spacing={3} direction="column" className="mt-[10px]">
          {Salaries.map((salary) => (
            <Radio value={`${salary.from}-${salary.to}`}>
              <div className="text-[--gray-500] text-[14px]">
                {salary.label}
              </div>
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
    </>
  );
}
