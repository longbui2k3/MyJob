import { Text } from "../text";

interface NotFoundListProps {
  info?: string;
}

export default function NotFoundList({ info = "" }: NotFoundListProps) {
  return (
    <div className="flex flex-col items-center h-[300px]">
      <img src="/not_found_list.png" height={"100%"} width={"350px"} />
      <Text className="text-[14px]">{info}</Text>
    </div>
  );
}
