import { Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";
import { Heading } from "../../headings";
import { Educations } from "../../../helpers/constants";

export default function EducationCheckbox() {
  return (
    <>
      <Heading size={17} name="Education" className="font-semibold" />
      <CheckboxGroup defaultValue={[""]}>
        <Stack spacing={3} direction="column" className="mt-[10px]">
          <Checkbox value="" defaultChecked>
            <div className="text-[--gray-500] text-[14px]">{"All"}</div>
          </Checkbox>
          {Educations.map((type) => (
            <Checkbox value={type}>
              <div className="text-[--gray-500] text-[14px]">{type}</div>
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
    </>
  );
}
