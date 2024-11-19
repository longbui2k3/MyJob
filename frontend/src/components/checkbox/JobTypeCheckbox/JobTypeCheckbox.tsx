import { Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";
import { Heading } from "../../headings";
import { JobTypes } from "../../../helpers/constants";

interface JobTypeCheckboxProps {
  jobTypes?: Array<string>;
  setJobTypes?: (jobTypes: Array<string>) => void;
}

export default function JobTypeCheckbox({
  jobTypes = [],
  setJobTypes = () => {},
}: JobTypeCheckboxProps) {
  return (
    <>
      <Heading size={17} name="Job Type" className="font-semibold" />

      <CheckboxGroup
        value={jobTypes}
        onChange={(jobTypes: Array<string>) => {
          setJobTypes(jobTypes);
        }}
      >
        <Stack spacing={3} direction="column" className="mt-[10px]">
          {JobTypes.map((type, i) => (
            <Checkbox value={`${i}`}>
              <div className="text-[--gray-500] text-[14px]">{type}</div>
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
    </>
  );
}
