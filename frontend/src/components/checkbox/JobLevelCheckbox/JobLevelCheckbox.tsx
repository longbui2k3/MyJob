import { Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";
import { Heading } from "../../headings";
import { JobLevels } from "../../../helpers/constants";

interface JobLevelCheckboxProps {
  jobLevels?: Array<string>;
  setJobLevels?: (jobLevels: Array<string>) => void;
}

export default function JobLevelCheckbox({
  jobLevels = [],
  setJobLevels = () => {},
}: JobLevelCheckboxProps) {
  return (
    <>
      <Heading size={17} name="Job Level" className="font-semibold" />

      <CheckboxGroup
        value={jobLevels}
        onChange={(jobLevels: Array<string>) => {
          setJobLevels(jobLevels);
        }}
      >
        <Stack spacing={3} direction="column" className="mt-[10px]">
          {JobLevels.map((type, i) => (
            <Checkbox value={`${i}`}>
              <div className="text-[--gray-500] text-[14px]">{type}</div>
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
    </>
  );
}
