import { Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import { RxLink2 } from "react-icons/rx";
import { RichTextEditer } from "../inputs/RichTextEditer";
import BaseInput from "../inputs/Input/BaseInput";
import { BaseSelect } from "../select";

interface FormFoundingInfoProps {
  organizationType: string;
  industryType: string;
  teamSize: string;
  yearOfEstablishment: string;
  companyWebsite: string;
  companyVision: string;
  onOrganizationTypeChange: (value: string) => void;
  onIndustryTypeChange: (value: string) => void;
  onTeamSizeChange: (value: string) => void;
  onYearOfEstablishmentChange: (value: Date) => void;
  onCompanyWebsiteChange: (value: string) => void;
  onCompanyVisionChange: (value: string) => void;
}

export default function FormFoundingInfo({
  organizationType,
  industryType,
  teamSize,
  yearOfEstablishment,
  companyWebsite,
  companyVision,
  onOrganizationTypeChange,
  onIndustryTypeChange,
  onTeamSizeChange,
  onYearOfEstablishmentChange,
  onCompanyWebsiteChange,
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

  const handleCompanyVisionChange = (content: string) => {
    onCompanyVisionChange(content);
  };

  return (
    <div className="flex flex-col text-gray-900 space-y-4">
      <div className="grid grid-cols-3 gap-4 font-normal text-sm">
        <BaseSelect
          label="Organization Type"
          options={[
            "Public",
            "Private",
            "Non-Profit",
            "Government",
            "Partnership",
            "Sole Proprietorship",
            "Corporation",
          ]}
          value={organizationType}
          onChange={onOrganizationTypeChange}
        />

        <BaseSelect
          label="Industry Type"
          options={[
            "Technology",
            "Finance",
            "Healthcare",
            "Manufacturing",
            "Retail",
            "Education",
            "Real Estate",
            "Hospitality",
            "Consulting",
            "Transportation",
          ]}
          value={industryType}
          onChange={onIndustryTypeChange}
        />

        <BaseSelect
          label="Team Size"
          options={[
            "1-10",
            "11-50",
            "51-200",
            "201-500",
            "501-1000",
            "1001-5000",
            "5001+",
          ]}
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
          <Text className="font-normal text-sm mb-2">Company Website</Text>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <RxLink2 size={22} color="var(--primary-500)" />
            </InputLeftElement>
            <Input
              type="url"
              placeholder="Website url..."
              value={companyWebsite}
              onChange={handleCompanyWebsiteChange}
            />
          </InputGroup>
        </div>
      </div>
      <div>
        <RichTextEditer
          label="Company Vision"
          placeholder="Tell us about your company vision..."
          value={companyVision}
          onChange={handleCompanyVisionChange}
        ></RichTextEditer>
      </div>
    </div>
  );
}
