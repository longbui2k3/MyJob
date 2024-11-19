import { useEducationCheckbox } from "../../checkbox/EducationCheckbox";
import { useExperienceCheckbox } from "../../checkbox/ExperienceCheckbox";
import { useJobLevelCheckbox } from "../../checkbox/JobLevelCheckbox";
import { useJobTypeCheckbox } from "../../checkbox/JobTypeCheckbox";
import { useSalaryRadiobutton } from "../../radiobutton/SalaryRadiobutton";
import { useCategorySelect } from "../../select/CategorySelect";
import { useLocationSelect } from "../../select/LocationSelect";
import { useSearchJobInput } from "../SearchJobInput";

export default function useSearchInput_3() {
  const { category, setCategory } = useCategorySelect();
  const { provinceCode, setProvinceCode } = useLocationSelect();
  const { search, setSearch } = useSearchJobInput();
  const { experiences, setExperiences } = useExperienceCheckbox();
  const { educations, setEducations } = useEducationCheckbox();
  const { jobLevels, setJobLevels } = useJobLevelCheckbox();
  const { jobTypes, setJobTypes } = useJobTypeCheckbox();
  const { salary, setSalary } = useSalaryRadiobutton();

  return {
    category,
    setCategory,
    provinceCode,
    setProvinceCode,
    search,
    setSearch,
    experiences,
    setExperiences,
    educations,
    setEducations,
    jobLevels,
    setJobLevels,
    jobTypes,
    setJobTypes,
    salary,
    setSalary,
  };
}
