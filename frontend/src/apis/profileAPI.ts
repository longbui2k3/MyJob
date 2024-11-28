import { HttpMethods } from "../helpers/constants";
import { changeQueryObjToQueryStr } from "../utils";
import BaseAPI from "./baseAPI";

export const FindProfilesAPI = async (query: {
  page?: number;
  limit?: number;
}) => {
  return await BaseAPI({
    path: `/profile?${changeQueryObjToQueryStr(query)}`,
    method: HttpMethods.GET,
  });
};

export const FindProfileAPI = async (id: string) => {
  return await BaseAPI({
    path: `/profile/${id}`,
    method: HttpMethods.GET,
  });
};

export const UpdateProfileAPI = async (body: {
  avatar?: File | null;
  fullName?: string | null;
  title?: string | null;
  experience?: string | null;
  education?: string | null;
  personalWebsite?: string | null;
  mobile?: string | null;
  mapLocation?: string | null;
  gender?: string | null;
  provinceCode?: number | null;
  dateOfBirth?: Date | null;
  maritalStatus?: string | null;
  biography?: string | null;
  address?: string | null;
  socialMedias?: { socialMedia: string; linkUrl: string }[];
}) => {
  const formData = new FormData();
  if (body.avatar) formData.append("avatar", body.avatar);
  if (body.fullName) formData.append("fullName", body.fullName);
  if (body.title) formData.append("title", body.title);
  if (body.experience) formData.append("experience", body.experience);
  if (body.education) formData.append("education", body.education);
  if (body.personalWebsite)
    formData.append("personalWebsite", body.personalWebsite);
  if (body.mobile) formData.append("mobile", body.mobile);
  if (body.mapLocation) formData.append("mapLocation", body.mapLocation);
  if (body.gender) formData.append("gender", body.gender);
  if (body.provinceCode !== undefined && body.provinceCode !== null)
    formData.append("provinceCode", body.provinceCode.toString());
  if (body.dateOfBirth)
    formData.append("dateOfBirth", body.dateOfBirth.toISOString());
  if (body.maritalStatus) formData.append("maritalStatus", body.maritalStatus);
  if (body.biography) formData.append("biography", body.biography);
  if (body.address) formData.append("address", body.address);
  if (body.socialMedias)
    formData.append("socialMedias", JSON.stringify(body.socialMedias));
  return await BaseAPI({
    path: `/profile`,
    method: HttpMethods.PATCH,
    body: formData,
  });
};
