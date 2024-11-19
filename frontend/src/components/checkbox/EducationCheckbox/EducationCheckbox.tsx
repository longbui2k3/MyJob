import { Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";
import { Heading } from "../../headings";
import { Educations } from "../../../helpers/constants";

interface EducationCheckboxProps {
  educations?: Array<string>;
  setEducations?: (educations: Array<string>) => void;
}

export default function EducationCheckbox({
  educations = [],
  setEducations = () => {},
}: EducationCheckboxProps) {
  return (
    <>
      <Heading size={17} name="Education" className="font-semibold" />

      <CheckboxGroup
        value={educations}
        onChange={(educations: Array<string>) => {
          setEducations(educations);
        }}
      >
        <Stack spacing={3} direction="column" className="mt-[10px]">
          {Educations.map((type, i) => (
            <Checkbox value={`${i}`}>
              <div className="text-[--gray-500] text-[14px]">{type}</div>
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
    </>
  );
}
