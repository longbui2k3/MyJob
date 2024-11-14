import { Checkbox, Stack } from "@chakra-ui/react";
import { Heading } from "../../headings";
import { JobTypes } from "../../../helpers/constants";

export default function JobTypeCheckbox() {
  return (
    <>
      <Heading size={17} name="Job Type" className="font-semibold" />
      <Stack spacing={3} direction="column" className="mt-[10px]">
        <Checkbox value="" defaultChecked>
          <div className="text-[--gray-500] text-[14px]">{"All"}</div>
        </Checkbox>
        {JobTypes.map((type) => (
          <Checkbox value={type}>
            <div className="text-[--gray-500] text-[14px]">{type}</div>
          </Checkbox>
        ))}
      </Stack>
    </>
  );
}
