import { RadioGroup, Stack } from "@chakra-ui/react";
import { Heading5 } from "../../headings";
import { BaseRadio } from "../../radio";

interface ApplyJobOnProps {
  applyJobOn: string;
  onApplyJobOnChange: (value: string) => void;
}

export default function ApplyJobOn({
  applyJobOn,
  onApplyJobOnChange,
}: ApplyJobOnProps) {
  return (
    <div className="p-5 bg-gray-200 rounded-md">
      <Heading5 name="Apply Job on:" className="mb-4" />
      <RadioGroup
        size="lg"
        value={applyJobOn}
        onChange={onApplyJobOnChange}
      >
        <Stack direction="row" spacing="5">
          <BaseRadio
            label="On Jobpilot"
            note="Candidate will apply job using jobpilot & all application will show on your dashboard."
            value="website"
          />
          <BaseRadio
            label="External Platform"
            note="Candidate apply job on your website, all application on your own website."
            value="external_platform"
          />
          <BaseRadio
            label="On Your Email"
            note="Candidate apply job on your email address, and all application in your email."
            value="email"
          />
        </Stack>
      </RadioGroup>
    </div>
  );
}
