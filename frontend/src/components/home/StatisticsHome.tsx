import { Heading5 } from "../headings";
import { IconWithBg } from "../icons";
import { Text } from "../text";

export default function StatisticsHome() {
  const statistics = [
    {
      name: "Live Job",
      value: "175,324",
      image_url: "/briefcase_1.svg",
      bg: "--primary-50",
    },
    {
      name: "Companies",
      value: "97,354",
      image_url: "/building.svg",
      bg: "--primary-600",
    },
    {
      name: "Candidates",
      value: "3,847,154",
      image_url: "/people.svg",
      bg: "--primary-50",
    },
    {
      name: "Live Job",
      value: "7,532",
      image_url: "/briefcase_1.svg",
      bg: "--primary-50",
    },
  ];
  return (
    <div className="grid grid-cols-4 space-x-5 h-[70px] mt-[50px]">
      {statistics.map((statistic) => (
        <div className="flex bg-white p-2 rounded-md">
          <IconWithBg
            divSize={54}
            imgSize={40}
            src={statistic.image_url}
            backgroundColor={`var(${statistic.bg})`}
          />
          <div className="ml-3">
            <Heading5 name={statistic.value} />
            <Text className="mt-[1px]">{statistic.name}</Text>
          </div>
        </div>
      ))}
    </div>
  );
}
