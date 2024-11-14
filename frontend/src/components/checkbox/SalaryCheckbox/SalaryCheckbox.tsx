import { Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";
import { Heading } from "../../headings";
import { Salaries } from "../../../helpers/constants";

export default function SalaryCheckbox() {
  return (
    <>
      <Heading size={17} name="Salary" className="font-semibold" />
      <CheckboxGroup defaultValue={[""]}>
        <Stack spacing={3} direction="column" className="mt-[10px]">
          <Checkbox value={""} defaultChecked>
            <div className="text-[--gray-500] text-[14px]">{"Select All"}</div>
          </Checkbox>
          {Salaries.map((salary) => (
            <Checkbox value={`${salary.from}-${salary.to}`}>
              <div className="text-[--gray-500] text-[14px]">
                {salary.label}
              </div>
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
    </>
  );
}
