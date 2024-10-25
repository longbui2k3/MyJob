import { useState } from "react";
import TabItem from "./TabItem";
import { AtIcon, GlobeSimpleIcon, UserCircleIcon, UserIcon } from "../icons";
import FormCompanyInfo from "./FormCompanyInfo";
import FormFoundingInfo from "./FormFoundingInfo";
import FormSocialMediaInfo from "./FormSocialMediaInfo";
import FormContact from "./FormContact";
import { GrLinkNext } from "react-icons/gr";
import { Button } from "@chakra-ui/react";
import { CreateCompanyAPI } from "../../apis/companyAPI";

export default function Tabs() {
  const [activeIndex, setActiveIndex] = useState(1);
  const handelClick = (index: number) => setActiveIndex(index);

  // logo
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const handleLogoChange = (file: File | null) => setLogoFile(file);
  // banner
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const handleBannerChange = (file: File | null) => setBannerFile(file);

  // company name
  const [inputCompanyName, setInputCompanyName] = useState<string>("");
  const handleInputCompanyNameChange = (name: string) => {
    setInputCompanyName(name);
  };

  // about us
  const [aboutUs, setAboutUs] = useState<string>("");
  const handleAboutUsChange = (value: string) => {
    setAboutUs(value);
  };

  // organization Type
  const [organizationType, setOrganizationType] = useState<string>("");
  const handleOrganizationTypeChange = (value: string) => {
    setOrganizationType(value);
  };

  // industry Type
  const [industryType, setIndustryType] = useState<string>("");
  const handleIndustryTypeChange = (value: string) => {
    setIndustryType(value);
  };

  // team Size
  const [teamSize, setTeamSize] = useState<string>("");
  const handleTeamSizeChange = (value: string) => {
    setTeamSize(value);
  };

  // year Of Establishment
  const [yearOfEstablishment, setYearOfEstablishment] = useState<Date | null>(
    null
  );
  const handleYearOfEstablishmentChange = (value: Date) => {
    setYearOfEstablishment(value);
  };

  // company Website
  const [companyWebsite, setCompanyWebsite] = useState<string>("");
  const handleCompanyWebsiteChange = (value: string) => {
    setCompanyWebsite(value);
  };

  // company Vision
  const [companyVision, setCompanyVision] = useState<string>("");
  const handleCompanyVisionChange = (value: string) => {
    setCompanyVision(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputCompanyName || !logoFile || !bannerFile || !yearOfEstablishment)
      return;
    const data = await CreateCompanyAPI({
      companyName: inputCompanyName,
      logo: logoFile,
      banner: bannerFile,
      aboutUs: aboutUs,
      organizationType: organizationType,
      industryType: industryType,
      teamSize: teamSize,
      yearOfEstablishment: yearOfEstablishment,
      companyWebsite: companyWebsite,
      companyVision: companyVision,
    });
    console.log(data);
    if (data.status === 201) {
      console.log("tao cong ty thanh cong");
    } else {
      console.log("tao cong ty that bai");
    }
  };

  const TabList = [
    {
      id: 1,
      tabitem: (
        <TabItem
          icon={<UserIcon />}
          title="Company Info"
          activeColor={`${
            activeIndex === 1 ? "var(--primary-600)" : "var(--gray-500)"
          }`}
        />
      ),
      content: (
        <FormCompanyInfo
          inputCompanyName={inputCompanyName}
          onInputCompanyNameChange={handleInputCompanyNameChange}
          onAboutUsChange={handleAboutUsChange}
          onLogoChange={handleLogoChange}
          onBannerChange={handleBannerChange}
        />
      ),
    },
    {
      id: 2,
      tabitem: (
        <TabItem
          icon={<UserCircleIcon />}
          title="Founding Info"
          activeColor={`${
            activeIndex === 2 ? "var(--primary-600)" : "var(--gray-500)"
          }`}
        />
      ),
      content: (
        <FormFoundingInfo
          onIndustryTypeChange={handleIndustryTypeChange}
          onOrganizationTypeChange={handleOrganizationTypeChange}
          onTeamSizeChange={handleTeamSizeChange}
          onYearOfEstablishmentChange={handleYearOfEstablishmentChange}
          onCompanyWebsiteChange={handleCompanyWebsiteChange}
          onCompanyVisionChange={handleCompanyVisionChange}
        />
      ),
    },
    {
      id: 3,
      tabitem: (
        <TabItem
          icon={<GlobeSimpleIcon />}
          title="Social Media Profile"
          activeColor={`${
            activeIndex === 3 ? "var(--primary-600)" : "var(--gray-500)"
          }`}
        />
      ),
      content: <FormSocialMediaInfo />,
    },
    {
      id: 4,
      tabitem: (
        <TabItem
          icon={<AtIcon />}
          title="Contact"
          activeColor={`${
            activeIndex === 4 ? "var(--primary-600)" : "var(--gray-500)"
          }`}
        />
      ),
      content: <FormContact />,
    },
  ];

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex justify-center border-b-2 space-x-2">
        {TabList.map((item) => (
          <button
            key={item.id}
            className={`${
              activeIndex === item.id ? " border-b-2 border-b-primary-600" : ""
            }`}
            onClick={() => handelClick(item.id)}
          >
            {item.tabitem}
          </button>
        ))}
      </div>
      {TabList.map((item) => (
        <div
          key={item.id}
          className={`${activeIndex === item.id ? "block" : "hidden"}`}
        >
          {item.content}
        </div>
      ))}

      <div className="flex">
        {/* <Button
          className="mr-3"
          display={activeIndex === 1 ? "none" : "block"}
          onClick={() => handelClick(activeIndex - 1)}
        >
          Previous
        </Button> */}
        <Button
          textColor={"white"}
          bg={"var(--primary-500)"}
          rightIcon={<GrLinkNext />}
          onClick={(e) => handleSubmit(e)}
          //onClick={() => handelClick(activeIndex + 1)}
        >
          {/* {activeIndex === 4 ? "Finish Editing" : "Save & Next"} */}
          Save
        </Button>
      </div>
    </div>
  );
}
