import { Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";
import { Heading } from "../../headings";
import { Experiences } from "../../../helpers/constants";

export default function ExperienceCheckbox() {
  return (
    <>
      <Heading size={17} name="Experience" className="font-semibold" />
      <CheckboxGroup defaultValue={[""]}>
        <Stack spacing={3} direction="column" className="mt-[10px]">
          <Checkbox value={""} defaultChecked>
            <div className="text-[--gray-500] text-[14px]">{"Select All"}</div>
          </Checkbox>
          {Experiences.map((experience) => (
            <Checkbox value={experience}>
              <div className="text-[--gray-500] text-[14px]">{experience}</div>
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
    </>
  );
}
