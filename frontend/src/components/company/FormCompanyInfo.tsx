import ProfilePicture from "./ProfilePicture";
import { RichTextEditer } from "../inputs/RichTextEditer";
import BaseInput from "../inputs/Input/BaseInput";

interface FormCompanyInfoProps {
  companyName: string;
  logo: string;
  banner: string;
  aboutUs: string;
  onCompanyNameChange: (name: string) => void; // Hàm callback để gửi dữ liệu về cha
  onAboutUsChange: (value: string) => void;
  onLogoChange: (file: File) => void;
  onBannerChange: (file: File) => void;
}

export default function FormCompanyInfo({
  companyName,
  logo,
  banner,
  aboutUs,
  onCompanyNameChange,
  onAboutUsChange,
  onLogoChange,
  onBannerChange,
}: FormCompanyInfoProps) {
  const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCompanyNameChange(e.target.value);
  };

  const handleAboutUsChange = (content: string) => {
    onAboutUsChange(content);
  };

  return (
    <div className="text-gray-900 space-y-4">
      <div className="font-medium text-lg leading-7">Logo & Banner Image</div>
      <div className="flex justify-between">
        <div className="w-[24.5%]">
          <ProfilePicture
            label="Upload document"
            note="A photo larger than 400 pixels work best. Max photo size 5 MB."
            className="aspect-square"
            fileUrl={logo}
            onFileChange={onLogoChange}
          />
        </div>
        <div className="w-[73.5%]">
          <ProfilePicture
            label="Banner image"
            note="Bannar images optical dimension 1520x400. Supported format JPEG, PNG. Max photo size 5 MB."
            className="aspect-[3/1]"
            fileUrl={banner}
            onFileChange={onBannerChange}
            required={false}
          />
        </div>
      </div>
      <div className="border-[1px]"></div>
      <div>
        <BaseInput
          label="Company name"
          type="text"
          value={companyName}
          onChange={handleCompanyNameChange}
        />
      </div>
      <div>
        <RichTextEditer
          label="About Us"
          placeholder="Write down about your company here. Let the candidate know who we are..."
          value={aboutUs}
          onChange={handleAboutUsChange}
        ></RichTextEditer>
      </div>
    </div>
  );
}
