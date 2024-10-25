import ProfilePicture from "./ProfilePicture";
import { CompanyNameInput } from "../inputs";
import { Text } from "@chakra-ui/react";
import { RichTextEditer } from "../inputs/RichTextEditer";

interface FormCompanyInfoProps {
  inputCompanyName?: string;
  onInputCompanyNameChange: (name: string) => void; // Hàm callback để gửi dữ liệu về cha
  onAboutUsChange: (value: string) => void;
  onLogoChange: (file: File | null) => void;
  onBannerChange: (file: File | null) => void;
}

export default function FormCompanyInfo({
  inputCompanyName,
  onInputCompanyNameChange,
  onAboutUsChange,
  onLogoChange,
  onBannerChange,
}: FormCompanyInfoProps) {
  const handleInputCompanyNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onInputCompanyNameChange(e.target.value);
  };

  const handleAboutUsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onAboutUsChange(e.target.value);
  };

  return (
    <div className="flex flex-col text-gray-900 space-y-4">
      <div className="font-medium text-lg leading-7">Logo & Banner Image</div>
      <div className="flex justify-between">
        <ProfilePicture
          title="Upload document"
          note="A photo larger than 400 pixels work best. Max photo size 5 MB."
          className="w-60"
          onFileChange={onLogoChange}
        />
        <ProfilePicture
          title="Banner image"
          note="Bannar images optical dimension 1520x400. Supported format JPEG, PNG. Max photo size 5 MB."
          className="w-[720px]"
          onFileChange={onBannerChange}
        />
      </div>
      <div className="border-[1px]"></div>
      <CompanyNameInput
        value={inputCompanyName}
        onChange={handleInputCompanyNameChange}
      />
      <div>
        <Text className="font-normal text-sm mb-2">About Us</Text>
        <RichTextEditer
          placeholder="Write down about your company here. Let the candidate know who we are..."
          onChange={handleAboutUsChange}
        ></RichTextEditer>
      </div>
    </div>
  );
}
