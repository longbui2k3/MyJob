import ProfilePicture from "./ProfilePicture";
import { CompanyNameInput, AboutUsEditer } from "../inputs";

interface FormCompanyInfoProps {
  inputCompanyName?: string;
  editerAboutUs?: string;
  onInputCompanyNameChange: (name: string) => void; // Hàm callback để gửi dữ liệu về cha
  onEditerAboutUsChange: (text: string) => void;
  onLogoChange: (file: File | null) => void;
  onBannerChange: (file: File | null) => void;
}

export default function FormCompanyInfo({
  inputCompanyName,
  editerAboutUs,
  onInputCompanyNameChange,
  onEditerAboutUsChange,
  onLogoChange,
  onBannerChange,
}: FormCompanyInfoProps) {
  const handleInputCompanyNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onInputCompanyNameChange(e.target.value); // Gọi hàm callback với giá trị từ input
  };

  const handleEditerAboutUsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onEditerAboutUsChange(e.target.value);
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
      <div>
        <CompanyNameInput
          value={inputCompanyName}
          onChange={handleInputCompanyNameChange}
        />
      </div>
      <div>
        <AboutUsEditer
          value={editerAboutUs}
          onChange={handleEditerAboutUsChange}
        />
        {/* <Text className="font-normal text-sm mb-2">Abouts us</Text>
        <RichTextEditer placeholder="Write down about your company here. Let the candidate know who we are..."></RichTextEditer> */}
      </div>
    </div>
  );
}
