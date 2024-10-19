import { Tooltip } from "@chakra-ui/react";

interface CustomTooltipProps {
  children?: JSX.Element | string;
  label?: string;
}

export default function CustomTooltip({
  children = <></>,
  label = "",
}: CustomTooltipProps) {
  return (
    <Tooltip
      label={label}
      backgroundColor={"white"}
      color={"var(--gray-900)"}
      paddingY={"8px"}
      paddingX={"12px"}
      borderRadius={"5px"}
    >
      {children}
    </Tooltip>
  );
}
