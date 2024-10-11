import BaseInput from "../inputs/Input/BaseInput";
import ProfilePicture from "./ProfilePicture";
import { Text } from "@chakra-ui/react";
import { RichTextEditer } from "../inputs/RichTextEditer";

interface FormCompanyInfoProps {
  companyName: string;
  onCompanyNameChange: (name: string) => void;
}

export default function FormCompanyInfo({
  companyName,
  onCompanyNameChange,
}: FormCompanyInfoProps) {
  const handleInputCompanyNameChange = (e) => {
    onCompanyNameChange(e.target.value);
  };

  return (
    <div className="flex flex-col text-gray-900 space-y-4">
      <div className="font-medium text-lg leading-7">Logo & Banner Image</div>
      <div className="flex justify-between">
        <ProfilePicture
          title="Upload document"
          note="A photo larger than 400 pixels work best. Max photo size 5 MB."
          className="w-60"
        />
        <ProfilePicture
          title="Banner image"
          note="Bannar images optical dimension 1520x400. Supported format JPEG, PNG. Max photo size 5 MB."
          className="w-[720px]"
        />
      </div>
      <div className="border-[1px]"></div>
      <div>
        <Text className="font-normal text-sm mb-2">Company name</Text>
        <BaseInput
          type="text"
          value={companyName}
          onChange={handleInputCompanyNameChange}
        />
      </div>
      <div>
        <Text className="font-normal text-sm mb-2">Abouts us</Text>
        <RichTextEditer placeholder="Write down about your company here. Let the candidate know who we are..."></RichTextEditer>
      </div>
    </div>
  );
}
