import { Radio } from "@chakra-ui/react";
interface BaseRadioProps {
  label?: string;
  note?: string;
  value?: string;
}
export default function BaseRadio({ label, note, value }: BaseRadioProps) {
  return (
    <Radio value={value} borderColor="var(--gray-500)" background={"white"}>
      <p className="font-semibold text-base">{label}</p>
      <p className="font-normal text-xs text-gray-500">{note}</p>
    </Radio>
  );
}
