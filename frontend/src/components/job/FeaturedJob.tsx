import { FiArrowRight } from "react-icons/fi";
import { ButtonOutline } from "../buttons";
import { Heading3 } from "../headings";
import JobRowsFill from "./JobRowsFill";
import { DEFAULT_PADDING_X } from "../../helpers/constants";

export default function FeaturedJob() {
  return (
    <div
      className={`w-full`}
      style={{
        padding: `80px ${DEFAULT_PADDING_X}`,
      }}
    >
      <div className="flex justify-between">
        <Heading3 name="Featured Job" />
        <ButtonOutline
          children={
            <div className="flex">
              <div>View All</div>
              <FiArrowRight className="text-[14px] my-auto ml-2" />
            </div>
          }
          className="my-auto"
        />
      </div>
      <div className="mt-8 flex flex-col space-y-4">
        {new Array(5).fill(0).map(() => (
          <JobRowsFill />
        ))}
      </div>
    </div>
  );
}
