import ProfilePicture from "./ProfilePicture";
import { Text } from "@chakra-ui/react";
import { RichTextEditer } from "../inputs/RichTextEditer";
import BaseInput from "../inputs/Input/BaseInput";

interface FormCompanyInfoProps {
  inputCompanyName: string;
  logo: string;
  banner: string;
  aboutUs: string;
  onInputCompanyNameChange: (name: string) => void; // Hàm callback để gửi dữ liệu về cha
  onAboutUsChange: (value: string) => void;
  onLogoChange: (file: File) => void;
  onBannerChange: (file: File) => void;
}

export default function FormCompanyInfo({
  inputCompanyName,
  logo,
  banner,
  aboutUs,
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

  const handleAboutUsChange = (content: string) => {
    onAboutUsChange(content);
  };

  return (
    <div className="flex flex-col text-gray-900 space-y-4">
      <div className="font-medium text-lg leading-7">Logo & Banner Image</div>
      <div className="flex justify-between">
        <ProfilePicture
          title="Upload document"
          note="A photo larger than 400 pixels work best. Max photo size 5 MB."
          className="w-60"
          fileUrl={logo}
          onFileChange={onLogoChange}
        />
        <ProfilePicture
          title="Banner image"
          note="Bannar images optical dimension 1520x400. Supported format JPEG, PNG. Max photo size 5 MB."
          className="w-[720px]"
          fileUrl={banner}
          onFileChange={onBannerChange}
        />
      </div>
      <div className="border-[1px]"></div>
      <div>
        <Text className="font-normal text-sm mb-2">Company name</Text>
        <BaseInput
          type="text"
          value={inputCompanyName}
          onChange={handleInputCompanyNameChange}
        />
      </div>
      <div>
        <Text className="font-normal text-sm mb-2">About Us</Text>
        <RichTextEditer
          placeholder="Write down about your company here. Let the candidate know who we are..."
          value={aboutUs}
          onChange={handleAboutUsChange}
        ></RichTextEditer>
      </div>
    </div>
  );
}
