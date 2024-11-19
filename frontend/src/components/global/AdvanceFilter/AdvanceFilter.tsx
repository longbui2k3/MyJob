import { Divider } from "@chakra-ui/react";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { ExperienceCheckbox } from "../../checkbox/ExperienceCheckbox";
import { SalaryRadiobutton } from "../../radiobutton/SalaryRadiobutton";
import { JobTypeCheckbox } from "../../checkbox/JobTypeCheckbox";
import { EducationCheckbox } from "../../checkbox/EducationCheckbox";
import { JobLevelCheckbox } from "../../checkbox/JobLevelCheckbox";

interface AdvanceFilterProps {
  isOpenAdvanceFilter?: boolean;
  setIsOpenAdvanceFilter?: (val: boolean) => void;
  experiences?: Array<string>;
  setExperiences?: (experiences: Array<string>) => void;
  educations?: Array<string>;
  setEducations?: (educations: Array<string>) => void;
  jobLevels?: Array<string>;
  setJobLevels?: (jobLevels: Array<string>) => void;
  jobTypes?: Array<string>;
  setJobTypes?: (jobTypes: Array<string>) => void;
  salary?: string;
  setSalary?: (salary: string) => void;
}

const AdvanceFilter = forwardRef<HTMLDivElement, AdvanceFilterProps>(
  (
    {
      setIsOpenAdvanceFilter = () => {},
      isOpenAdvanceFilter = false,
      experiences = [],
      setExperiences = () => {},
      educations = [],
      setEducations = () => {},
      jobLevels = [],
      setJobLevels = () => {},
      jobTypes = [],
      setJobTypes = () => {},
      salary = "",
      setSalary = () => {},
    }: AdvanceFilterProps,
    ref
  ) => {
    const innerRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => innerRef.current!, []);
    window.addEventListener("click", function (e: any) {
      const searchInput3 = document.querySelector(".search-input-3");
      if (innerRef && innerRef.current && innerRef.current.contains(e.target)) {
        return;
      }
      if (searchInput3 && searchInput3.contains(e.target)) {
        return;
      }
      setIsOpenAdvanceFilter(false);
    });
    return (
      <div
        className={`${
          isOpenAdvanceFilter
            ? "z-[2] visible transform opacity-100 scale-100"
            : "z-[0] transform opacity-0 scale-95"
        } absolute flex top-[60px] bg-white h-[400px] border-[--gray-100] border-[1px] rounded-md transition ease-out duration-100`}
        ref={innerRef}
      >
        <div className="flex-[20%] p-[25px]">
          <ExperienceCheckbox
            experiences={experiences}
            setExperiences={setExperiences}
          />
        </div>
        <Divider orientation="vertical" size={"4"} />
        <div className="flex-[20%] p-[25px]">
          <SalaryRadiobutton salary={salary} setSalary={setSalary} />
        </div>
        <Divider orientation="vertical" size={"4"} />
        <div className="flex-[20%] p-[25px]">
          <JobTypeCheckbox jobTypes={jobTypes} setJobTypes={setJobTypes} />
        </div>
        <Divider orientation="vertical" size={"4"} />
        <div className="flex-[20%] p-[25px]">
          <EducationCheckbox
            educations={educations}
            setEducations={setEducations}
          />
        </div>
        <Divider orientation="vertical" size={"4"} />
        <div className="flex-[20%] p-[25px]">
          <JobLevelCheckbox jobLevels={jobLevels} setJobLevels={setJobLevels} />
        </div>
      </div>
    );
  }
);

export default AdvanceFilter;
