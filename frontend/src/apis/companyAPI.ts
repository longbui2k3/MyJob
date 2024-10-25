import axios from "../configs/axios.config";
export const CreateCompanyAPI = async (body: {
  logo: File;
  banner: File;
  companyName: string;
  aboutUs: string;
  organizationType: string;
  industryType: string;
  teamSize: string;
  yearOfEstablishment: Date;
  companyWebsite: string;
  companyVision: string;
  // socialMedias: { socialMedia: string; linkUrl: string }[];
  // mapLocation: string;
  // phone: string;
  // email: string;
}) => {
  try {
    const formData = new FormData();
    formData.append("logo", body.logo);
    formData.append("banner", body.banner);
    formData.append("companyName", body.companyName);
    formData.append("aboutUs", body.aboutUs);
    formData.append("organizationType", body.organizationType);
    formData.append("industryType", body.industryType);
    formData.append("teamSize", body.teamSize);
    formData.append(
      "yearOfEstablishment",
      body.yearOfEstablishment.toISOString()
    );
    formData.append("companyWebsite", body.companyWebsite);
    // formData.append("socialMedias", JSON.stringify(body.socialMedias));
    // formData.append("mapLocation", body.mapLocation);
    // formData.append("phone", body.phone);
    // formData.append("email", body.email);

    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_DOMAIN}/company`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;

    // const res = await axios.post(
    //   `${import.meta.env.VITE_SERVER_DOMAIN}/company`,
    //   body
    // );
    // return res.data;
  } catch (err: any) {
    console.log(err);
    if (err) return err.response?.data;
  }
};
