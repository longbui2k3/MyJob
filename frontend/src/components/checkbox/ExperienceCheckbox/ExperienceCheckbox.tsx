import { Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";
import { Heading } from "../../headings";
import { Experiences } from "../../../helpers/constants";

interface ExperienceCheckboxProps {
  experiences?: Array<string>;
  setExperiences?: (experiences: Array<string>) => void;
}

export default function ExperienceCheckbox({
  experiences = [],
  setExperiences = () => {},
}: ExperienceCheckboxProps) {
  return (
    <>
      <Heading size={17} name="Experience" className="font-semibold" />

      <CheckboxGroup
        value={experiences}
        onChange={(experiences: Array<string>) => {
          setExperiences(experiences);
        }}
      >
        <Stack spacing={3} direction="column" className="mt-[10px]">
          {Experiences.map((experience, i) => (
            <Checkbox value={`${i}`}>
              <div className="text-[--gray-500] text-[14px]">{experience}</div>
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
    </>
  );
}
