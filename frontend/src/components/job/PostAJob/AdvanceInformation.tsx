import {
  Educations,
  Experiences,
  JobLevels,
  JobTypes,
} from "../../../helpers/constants";
import { Heading5 } from "../../headings";
import BaseInput from "../../inputs/Input/BaseInput";
import { BaseSelect } from "../../select";

interface AdvanceInformationProps {
  education: string;
  experience: string;
  jobType: string;
  vacancies: number | null;
  expirationDate: string;
  jobLevel: string;
  onEducationChange: (value: string) => void;
  onExperienceChange: (value: string) => void;
  onJobTypeChange: (value: string) => void;
  onVacanciesChange: (value: number) => void;
  onExpirationDateChange: (value: string) => void;
  onJobLevelChange: (value: string) => void;
}

export default function AdvanceInformation({
  education,
  experience,
  jobType,
  vacancies,
  expirationDate,
  jobLevel,
  onEducationChange,
  onExperienceChange,
  onJobTypeChange,
  onVacanciesChange,
  onExpirationDateChange,
  onJobLevelChange,
}: AdvanceInformationProps) {
  const handleVacanciesChange = (e) => {
    onVacanciesChange(e.target.value);
  };

  const handleExpirationDateChange = (e) => {
    const date = e.target.value;
    const updatedDate = `${date}T23:59:59.000Z`;
    onExpirationDateChange(updatedDate);
  };
  return (
    <>
      <Heading5 name="Advance Information" />
      <div className="grid grid-cols-3 gap-4">
        <BaseSelect
          label="Education"
          options={Educations}
          value={education}
          onChange={onEducationChange}
        />
        <BaseSelect
          label="Experience"
          options={Experiences}
          value={experience}
          onChange={onExperienceChange}
        />
        <BaseSelect
          label="Job Type"
          options={JobTypes}
          value={jobType}
          onChange={onJobTypeChange}
        />
        <div>
          <BaseInput
            label="Vacancies"
            type="number"
            placeholder="Enter vacancies"
            value={vacancies}
            onChange={handleVacanciesChange}
          />
        </div>
        <div>
          <BaseInput
            label="Expiration Date"
            type="date"
            value={expirationDate.split("T")[0]}
            onChange={handleExpirationDateChange}
          />
        </div>
        <BaseSelect
          label="Job Level"
          options={JobLevels}
          value={jobLevel}
          onChange={onJobLevelChange}
        />
      </div>
    </>
  );
}
