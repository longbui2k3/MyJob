import { Select } from "@chakra-ui/react";

interface PageLimitSelectProps {
  width?: string;
  height?: string;
}

export default function PageLimitSelect({
  width,
  height,
}: PageLimitSelectProps) {
  return (
    <Select height={height} width={width}>
      {new Array(6).fill(0).map((value, i) => (
        <option value={10 + i}>{`${10 + i} per pages`}</option>
      ))}
    </Select>
  );
}
