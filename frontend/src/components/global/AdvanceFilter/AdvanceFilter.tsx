import { Divider } from "@chakra-ui/react";
import { forwardRef } from "react";
import { ExperienceCheckbox } from "../../checkbox/ExperienceCheckbox";
import { SalaryCheckbox } from "../../checkbox/SalaryCheckbox";
import { JobTypeCheckbox } from "../../checkbox/JobTypeCheckbox";
import { EducationCheckbox } from "../../checkbox/EducationCheckbox";
import { JobLevelCheckbox } from "../../checkbox/JobLevelCheckbox";

interface AdvanceFilterProps {
  isOpenAdvanceFilter?: boolean;
}

const AdvanceFilter = forwardRef<HTMLInputElement, AdvanceFilterProps>(
  ({ isOpenAdvanceFilter = false }: AdvanceFilterProps, ref) => {
    // if (!isOpenAdvanceFilter) return <></>;
    return (
      <div
        className={`${
          isOpenAdvanceFilter
            ? "z-[2] visible transform opacity-100 scale-100"
            : "z-[0] transform opacity-0 scale-95"
        } absolute flex top-[60px] bg-white h-[400px] border-[--gray-100] border-[1px] rounded-md transition ease-out duration-100`}
        ref={ref}
      >
        <div className="flex-[20%] p-[25px]">
          <ExperienceCheckbox />
        </div>
        <Divider orientation="vertical" size={"4"} />
        <div className="flex-[20%] p-[25px]">
          <SalaryCheckbox />
        </div>
        <Divider orientation="vertical" size={"4"} />
        <div className="flex-[20%] p-[25px]">
          <JobTypeCheckbox />
        </div>
        <Divider orientation="vertical" size={"4"} />
        <div className="flex-[20%] p-[25px]">
          <EducationCheckbox />
        </div>
        <Divider orientation="vertical" size={"4"} />
        <div className="flex-[20%] p-[25px]">
          <JobLevelCheckbox />
        </div>
      </div>
    );
  }
);

export default AdvanceFilter;
