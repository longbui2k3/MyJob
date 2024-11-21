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
  address: string;
  provinceCode: number;
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
  formData.append("companyVision", body.companyVision);
  formData.append("socialMedias", JSON.stringify(body.socialMedias));
  formData.append("mapLocation", body.mapLocation);
  formData.append("address", body.address);
  formData.append("provinceCode", body.provinceCode.toString());
  formData.append("phone", body.phone);
  formData.append("email", body.email);
  return await BaseAPI({
    path: "/company",
    method: HttpMethods.POST,
    body: formData,
  });
};

export const UpdateCompanyAPI = async (
  id,
  body: {
    logo: File | undefined;
    banner: File | undefined;
    companyName: string;
    aboutUs: string;
    organizationType: string;
    industryType: string;
    teamSize: string;
    yearOfEstablishment: Date | undefined;
    companyWebsite: string;
    companyVision: string;
    socialMedias: { socialMedia: string; linkUrl: string }[];
    mapLocation: string;
    address: string;
    provinceCode: number;
    phone: string;
    email: string;
  }
) => {
  const formData = new FormData();
  if (body.logo) formData.append("logo", body.logo);
  if (body.banner) formData.append("banner", body.banner);
  formData.append("companyName", body.companyName);
  formData.append("aboutUs", body.aboutUs);
  formData.append("organizationType", body.organizationType);
  formData.append("industryType", body.industryType);
  formData.append("teamSize", body.teamSize);
  if (body.yearOfEstablishment)
    formData.append(
      "yearOfEstablishment",
      body.yearOfEstablishment.toISOString()
    );
  formData.append("companyWebsite", body.companyWebsite);
  formData.append("companyVision", body.companyVision);
  formData.append("socialMedias", JSON.stringify(body.socialMedias));
  formData.append("mapLocation", body.mapLocation);
  formData.append("address", body.address);
  formData.append("provinceCode", body.provinceCode.toString());
  formData.append("phone", body.phone);
  formData.append("email", body.email);

  return await BaseAPI({
    path: `/company/${id}`,
    method: HttpMethods.PATCH,
    body: formData,
  });
};

export const GetMyCompanyAPI = async () => {
  return await BaseAPI({
    path: "/company/mycompany",
    method: HttpMethods.GET,
  });
};

export const FindCompaniesAPI = async (query: {
  page?: number;
  limit?: number;
  search?: string;
  organizationType?: number;
  provinceCode?: number;
}) => {
  return await BaseAPI({
    path: `/company?${changeQueryObjToQueryStr(query)}`,
    method: HttpMethods.GET,
  });
};

export const FindCompanyAPI = async (id: string) => {
  return await BaseAPI({
    path: `/company/${id}`,
    method: HttpMethods.GET,
  });
};
