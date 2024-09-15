import { Switch } from "@chakra-ui/react";
interface CheckboxProps {
  label: string | JSX.Element;
  onChange: () => void;
}
export default function Checkbox({ label, onChange }: CheckboxProps) {
  return (
    <div className={"flex flex-row"}>
      <Switch
        id={"rememberMe"}
        sx={{
          "span.chakra-switch__track:not([data-checked])": {
            backgroundColor: "--graywhite",
          },
          "span.chakra-switch__track": {
            backgroundColor: "primary-500",
          },
        }}
        defaultChecked={false}
        size="md"
        className="my-auto"
        onChange={onChange}
      />
      <div
        className={"ms-[7px] my-auto text-[14px] leading-tight text-[--gray-500]"}
      >
        {label}
      </div>
    </div>
  );
}
