import { Select } from "@chakra-ui/react";
interface CreatedAtSelectProps {
  width?: string;
  height?: string;
}
export default function CreatedAtSelect({
  width = "160px",
  height,
}: CreatedAtSelectProps) {
  const createdAts = [
    {
      label: "Latest",
    },
    {
      label: "1 hour ago",
    },
    {
      label: "1 day ago",
    },
    {
      label: "1 month ago",
    },
  ];
  return (
    <Select height={height} width={width}>
      {createdAts.map((createdAt) => (
        <option>{createdAt.label}</option>
      ))}
    </Select>
  );
}
