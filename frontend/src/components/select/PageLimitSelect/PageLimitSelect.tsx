import { Select } from "@chakra-ui/react";

interface PageLimitSelectProps {
  width?: string;
  height?: string;
  onChange?: (e) => void;
}

export default function PageLimitSelect({
  width,
  height,
  onChange = (e) => {},
}: PageLimitSelectProps) {
  return (
    <Select
      height={height}
      width={width}
      onChange={onChange}
    >
      {new Array(8).fill(0).map((_, i) => (
        <option value={8 + i}>{`${8 + i} per pages`}</option>
      ))}
    </Select>
  );
}
