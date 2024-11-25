import { RxLink2 } from "react-icons/rx";
import { RichTextEditer } from "../inputs/RichTextEditer";
import BaseInput from "../inputs/Input/BaseInput";
import { BaseSelect } from "../select";
import {
  IndustryTypes,
  OrganizationTypes,
  TeamSizes,
} from "../../helpers/constants";

interface FormFoundingInfoProps {
  organizationType: string;
  industryType: string;
  teamSize: string;
  yearOfEstablishment: string;
  companyWebsite: string;
  companyBenefits: string;
  companyVision: string;
  onOrganizationTypeChange: (value: string) => void;
  onIndustryTypeChange: (value: string) => void;
  onTeamSizeChange: (value: string) => void;
  onYearOfEstablishmentChange: (value: Date) => void;
  onCompanyWebsiteChange: (value: string) => void;
  onCompanyBenefitsChange: (value: string) => void;
  onCompanyVisionChange: (value: string) => void;
}

export default function FormFoundingInfo({
  organizationType,
  industryType,
  teamSize,
  yearOfEstablishment,
  companyWebsite,
  companyBenefits,
  companyVision,
  onOrganizationTypeChange,
  onIndustryTypeChange,
  onTeamSizeChange,
  onYearOfEstablishmentChange,
  onCompanyWebsiteChange,
  onCompanyBenefitsChange,
  onCompanyVisionChange,
}: FormFoundingInfoProps) {
  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    onYearOfEstablishmentChange(selectedDate);
  };

  const handleCompanyWebsiteChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onCompanyWebsiteChange(e.target.value);
  };

  const handleCompanyBenefitsChange = (content: string) => {
    onCompanyBenefitsChange(content);
  };

  const handleCompanyVisionChange = (content: string) => {
    onCompanyVisionChange(content);
  };

  return (
    <div className="flex flex-col text-gray-900 space-y-4">
      <div className="grid grid-cols-3 gap-4 font-normal text-sm">
        <BaseSelect
          label="Organization Type"
          options={OrganizationTypes}
          value={organizationType}
          onChange={onOrganizationTypeChange}
        />

        <BaseSelect
          label="Industry Type"
          options={IndustryTypes}
          value={industryType}
          onChange={onIndustryTypeChange}
        />

        <BaseSelect
          label="Team Size"
          options={TeamSizes}
          value={teamSize}
          onChange={onTeamSizeChange}
        />
        <div>
          <BaseInput
            label="Year of Establishment"
            type="date"
            value={yearOfEstablishment}
            onChange={handleYearChange}
          />
        </div>
        <div>
          <BaseInput
            LeftIcon={RxLink2}
            label="Company Website"
            type="url"
            placeholder="Website url..."
            value={companyWebsite}
            onChange={handleCompanyWebsiteChange}
          />
        </div>
      </div>
      <div>
        <RichTextEditer
          label="Company Benefits"
          placeholder="Describe the benefits and perks your company offers to employees."
          value={companyBenefits}
          onChange={handleCompanyBenefitsChange}
        />
      </div>
      <div>
        <RichTextEditer
          label="Company Vision"
          placeholder="Tell us about your company vision..."
          value={companyVision}
          onChange={handleCompanyVisionChange}
        />
      </div>
    </div>
  );
}
