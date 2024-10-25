import BaseSelect from "./BaseSelect";
import { Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import { RxLink2 } from "react-icons/rx";
import { RichTextEditer } from "../inputs/RichTextEditer";

interface FormFoundingInfoProps {
  onOrganizationTypeChange: (value: string) => void;
  onIndustryTypeChange: (value: string) => void;
  onTeamSizeChange: (value: string) => void;
  onYearOfEstablishmentChange: (value: Date) => void;
  onCompanyWebsiteChange: (value: string) => void;
  onCompanyVisionChange: (value: string) => void;
}

export default function FormFoundingInfo({
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

  const handleCompanyVisionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onCompanyVisionChange(e.target.value);
  };
  return (
    <div className="flex flex-col text-gray-900 space-y-4">
      <div className="grid grid-cols-3 gap-4 font-normal text-sm">
        <BaseSelect
          text="Organization Type"
          options={[
            { value: "Public", label: "Public" },
            { value: "Private", label: "Private" },
            { value: "Non-Profit", label: "Non-Profit" },
            { value: "Government", label: "Government" },
            { value: "Partnership", label: "Partnership" },
            { value: "Sole Proprietorship", label: "Sole Proprietorship" },
            { value: "Corporation", label: "Corporation" },
          ]}
          onChange={onOrganizationTypeChange}
        />

        <BaseSelect
          text="Industry Type"
          options={[
            { value: "Technology", label: "Technology" },
            { value: "Finance", label: "Finance" },
            { value: "Healthcare", label: "Healthcare" },
            { value: "Manufacturing", label: "Manufacturing" },
            { value: "Retail", label: "Retail" },
            { value: "Education", label: "Education" },
            { value: "Real Estate", label: "Real Estate" },
            { value: "Hospitality", label: "Hospitality" },
            { value: "Consulting", label: "Consulting" },
            { value: "Transportation", label: "Transportation" },
          ]}
          onChange={onIndustryTypeChange}
        />

        <BaseSelect
          text="Team Size"
          options={[
            { value: "1-10", label: "1-10 employees" },
            { value: "11-50", label: "11-50 employees" },
            { value: "51-200", label: "51-200 employees" },
            { value: "201-500", label: "201-500 employees" },
            { value: "501-1000", label: "501-1000 employees" },
            { value: "1001-5000", label: "1001-5000 employees" },
            { value: "5001+", label: "5001+ employees" },
          ]}
          onChange={onTeamSizeChange}
        />

        <div>
          <Text className="font-normal text-sm mb-2">
            Year of Establishment
          </Text>
          {/* <BaseInput type="date" onChange={handleYearChange} /> */}
          <Input type="date" onChange={handleYearChange} />
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
              onChange={handleCompanyWebsiteChange}
            />
          </InputGroup>
        </div>
      </div>
      <div>
        <Text className="font-normal text-sm mb-2">Company Vision</Text>
        <RichTextEditer
          placeholder="Tell us about your company vision..."
          onChange={handleCompanyVisionChange}
        ></RichTextEditer>
      </div>
    </div>
  );
}
