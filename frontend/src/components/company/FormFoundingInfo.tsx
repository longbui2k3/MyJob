import BaseInput from "../inputs/Input/BaseInput";
import BaseSelect from "./BaseSelect";
import { Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import { RxLink2 } from "react-icons/rx";
import { RichTextEditer } from "../inputs/RichTextEditer";

export default function FormFoundingInfo() {
  return (
    <div className="flex flex-col text-gray-900 space-y-4">
      <div className="grid grid-cols-3 gap-4 font-normal text-sm">
        <BaseSelect
          text="Organization Type"
          options={[
            { value: "non-profit", label: "Non-Profit" },
            { value: "corporation", label: "Corporation" },
            { value: "government", label: "Government" },
          ]}
        />

        <BaseSelect
          text="Industry Type"
          options={[
            { value: "technology", label: "Technology" },
            { value: "finance", label: "Finance" },
            { value: "healthcare", label: "Healthcare" },
            { value: "education", label: "Education" },
            { value: "retail", label: "Retail" },
          ]}
        />

        <BaseSelect
          text="Team Size"
          options={[
            { value: "1-10", label: "1-10 employees" },
            { value: "11-50", label: "11-50 employees" },
            { value: "51-200", label: "51-200 employees" },
            { value: "201-500", label: "201-500 employees" },
            { value: "500+", label: "500+ employees" },
          ]}
        />

        <div>
          <Text className="font-normal text-sm mb-2">
            Year of Establishment
          </Text>
          <BaseInput type="date" />
        </div>
        <div>
          <Text className="font-normal text-sm mb-2">Company Website</Text>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <RxLink2 size={22} color="var(--primary-500)" />
            </InputLeftElement>
            <Input type="url" placeholder="Website url..." />
          </InputGroup>
        </div>
      </div>
      <div>
        <Text className="font-normal text-sm mb-2">Company Vision</Text>
        <RichTextEditer placeholder="Tell us about your company vision..."></RichTextEditer>
      </div>
    </div>
  );
}
