import { Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";
import { Heading } from "../../headings";
import { JobLevels } from "../../../helpers/constants";

export default function JobLevelCheckbox() {
  return (
    <>
      <Heading size={17} name="Job Level" className="font-semibold" />
      <Stack spacing={3} direction="column" className="mt-[10px]">
        <CheckboxGroup defaultValue={[""]}>
          <Checkbox value="" defaultChecked>
            <div className="text-[--gray-500] text-[14px]">{"All"}</div>
          </Checkbox>
          {JobLevels.map((type) => (
            <Checkbox value={type}>
              <div className="text-[--gray-500] text-[14px]">{type}</div>
            </Checkbox>
          ))}
        </CheckboxGroup>
      </Stack>
    </>
  );
}
