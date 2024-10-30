import { HttpMethods } from "../helpers/constants";
import { changeQueryObjToQueryStr } from "../utils";
import BaseAPI from "./baseAPI";
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
  socialMedias: { socialMedia: string; linkUrl: string }[];
  mapLocation: string;
  phone: string;
  email: string;
}) => {
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
  formData.append("socialMedias", JSON.stringify(body.socialMedias));
  formData.append("mapLocation", body.mapLocation);
  formData.append("phone", body.phone);
  formData.append("email", body.email);
  return await BaseAPI({
    path: "/company",
    method: HttpMethods.POST,
    body: formData,
  });
};

export const FindCompaniesAPI = async (query: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  return await BaseAPI({
    path: `/company?${changeQueryObjToQueryStr(query)}`,
    method: HttpMethods.GET,
  });
};
