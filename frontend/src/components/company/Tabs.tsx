import { useEffect, useState } from "react";
import TabItem from "./TabItem";
import { AtIcon, GlobeSimpleIcon, UserCircleIcon, UserIcon } from "../icons";
import FormCompanyInfo from "./FormCompanyInfo";
import FormFoundingInfo from "./FormFoundingInfo";
import FormSocialMediaInfo from "./FormSocialMediaInfo";
import FormContact from "./FormContact";
import { GrLinkNext } from "react-icons/gr";
import { Button } from "@chakra-ui/react";
import {
  CreateCompanyAPI,
  GetMyCompanyAPI,
  UpdateCompanyAPI,
} from "../../apis/companyAPI";
import { useNavigate } from "react-router-dom";
import { COMPLETED_COMPANY_KEY, getRoute } from "../../helpers/constants";
import { useAuthContext } from "../../context";
import GearSixIcon from "../icons/GearSixIcon";

export default function Tabs() {
  const [activeIndex, setActiveIndex] = useState(1);
  const handelClick = (index: number) => setActiveIndex(index);
  const navigate = useNavigate();
  const [isSettings, setIsSettings] = useState<boolean>(false);
  const { user } = useAuthContext();

  useEffect(() => {
    if (typeof user !== "string" && user?.hasCompany !== false) {
      setIsSettings(true);
    }
  }, [user]);

  // console.log(isSettings);
  // logo
  const [logoFile, setLogoFile] = useState<File>();
  const [logoUrl, setLogoUrl] = useState<string>("");
  const handleLogoChange = (file: File) => setLogoFile(file);

  // banner
  const [bannerFile, setBannerFile] = useState<File>();
  const [bannerUrl, setBannerUrl] = useState<string>("");
  const handleBannerChange = (file: File) => setBannerFile(file);

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
  const [yearOfEstablishment, setYearOfEstablishment] = useState<Date>();
  const [yearOfEstablishmentVal, setYearOfEstablishmentVal] =
    useState<string>("");
  const handleYearOfEstablishmentChange = (value: Date) => {
    setYearOfEstablishment(value);
    setYearOfEstablishmentVal(value.toISOString().split("T")[0]);
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

  // social medias
  const [socialMedias, setSocialMedias] = useState<
    { socialMedia: string; linkUrl: string }[]
  >([]);
  const handleSocialMediaChange = (
    updatedSocialMedias: { socialMedia: string; linkUrl: string }[]
  ) => {
    setSocialMedias(updatedSocialMedias);
  };

  // map location
  const [mapLocation, setMapLocation] = useState<string>("");
  const handleMapLocationChange = (value: string) => {
    setMapLocation(value);
  };

  // phone
  const [phone, setPhone] = useState<string>("");
  const handlePhoneChange = (value: string) => {
    setPhone(value);
  };

  // email
  const [email, setEmail] = useState<string>("");
  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const [id, setId] = useState<string>("");

  const [companyData, setCompanyData] = useState<any>(null);
  useEffect(() => {
    const fetchCompanyData = async () => {
      const data = await GetMyCompanyAPI();
      setCompanyData(data); // Lưu dữ liệu vào state
    };

    fetchCompanyData();
  }, []);

  useEffect(() => {
    if (companyData && companyData.metadata) {
      // Thiết lập giá trị ban đầu
      setId(companyData.metadata._id);
      setLogoUrl(companyData.metadata.logo);
      setBannerUrl(companyData.metadata.banner);
      setInputCompanyName(companyData.metadata.companyName);
      setAboutUs(companyData.metadata.aboutUs);
      setOrganizationType(companyData.metadata.organizationType);
      setIndustryType(companyData.metadata.industryType);
      setTeamSize(companyData.metadata.teamSize);
      setYearOfEstablishmentVal(
        companyData.metadata.yearOfEstablishment.split("T")[0]
      );
      setCompanyWebsite(companyData.metadata.companyWebsite);
      setCompanyVision(companyData.metadata.companyVision);
      setSocialMedias(companyData.metadata.socialMedias);
      setMapLocation(companyData.metadata.mapLocation);
      setPhone(companyData.metadata.phone);
      setEmail(companyData.metadata.email);
    }
  }, [companyData]);

  // console.log(id);

  const handleCreateSubmit = async (e) => {
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
      socialMedias: socialMedias,
      mapLocation: mapLocation,
      phone: phone,
      email: email,
    });
    console.log(data);
    if (data.status === 201) {
      console.log("tao cong ty thanh cong");
      setTimeout(() => {
        navigate(getRoute(COMPLETED_COMPANY_KEY).path, { replace: true });
      }, 500);
    } else {
      console.log("tao cong ty that bai");
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const data = await UpdateCompanyAPI(id, {
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
      socialMedias: socialMedias,
      mapLocation: mapLocation,
      phone: phone,
      email: email,
    });
    console.log(data);
    if (data.status === 200) {
      console.log("cap nhat cong ty thanh cong");
    } else {
      console.log("cap nhat cong ty that bai");
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
          aboutUs={aboutUs}
          logo={logoUrl}
          banner={bannerUrl}
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
          organizationType={organizationType}
          industryType={industryType}
          teamSize={teamSize}
          yearOfEstablishment={yearOfEstablishmentVal}
          companyWebsite={companyWebsite}
          companyVision={companyVision}
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
      content: (
        <FormSocialMediaInfo
          socialMedias={socialMedias}
          onSocialMediaChange={handleSocialMediaChange}
        />
      ),
    },
    {
      id: 4,
      tabitem: (
        <TabItem
          icon={isSettings ? <GearSixIcon /> : <AtIcon />}
          title={isSettings ? "Account Setting" : "Contact"}
          activeColor={`${
            activeIndex === 4 ? "var(--primary-600)" : "var(--gray-500)"
          }`}
        />
      ),
      content: (
        <FormContact
          mapLocation={mapLocation}
          phone={phone}
          email={email}
          onMapLocationChange={handleMapLocationChange}
          onPhoneChange={handlePhoneChange}
          onEmailChange={handleEmailChange}
        />
      ),
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

      <div className={`flex ${isSettings ? "hidden" : "block"}`}>
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
          onClick={(e) => handleCreateSubmit(e)}
          //onClick={() => handelClick(activeIndex + 1)}
        >
          {/* {activeIndex === 4 ? "Finish Editing" : "Save & Next"} */}
          Save
        </Button>
      </div>
      <Button
        display={isSettings ? "block" : "none"}
        textColor={"white"}
        bg={"var(--primary-500)"}
        width={"150px"}
        onClick={(e) => handleUpdateSubmit(e)}
      >
        Save Changes
      </Button>
    </div>
  );
}
