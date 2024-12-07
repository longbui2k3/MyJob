import { DEFAULT_PADDING_X } from "../../helpers/constants";
import { Heading1 } from "../headings";
import { SearchInput_2 } from "../inputs";
import { Text } from "../text";
import StatisticsHome from "./StatisticsHome";
import Suggestion from "./Suggestion";

export default function HeroSection() {
  return (
    <div
      className={`w-full bg-[--gray-100]`}
      style={{
        padding: `60px ${DEFAULT_PADDING_X}`,
      }}
    >
      <div className="flex justify-center">
        <div className="w-[60%] flex flex-col justify-center">
          <Heading1
            name="Find a job that suits your interest & skills"
            className="w-[400px] leading-[1.2]"
          />
          <Text className="text-left w-[450px] mt-8 mb-8">
            Explore opportunities that align with your goals. Begin your journey
            towards a fulfilling career today!
          </Text>
          <SearchInput_2 />
          <Suggestion />  
        </div>
        <div className="w-[40%]">
          <img src="/home_1.png" className="h-[100%]" />
        </div>
      </div>
      <StatisticsHome />
    </div>
  );
}
