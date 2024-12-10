import { HttpMethods } from "../helpers/constants";
import BaseAPI from "./baseAPI";

export const FindFollowedCompanyAPI = async (companyId: string) => {
  return await BaseAPI({
    path: `/followedCompany/${companyId}`,
    method: HttpMethods.GET,
  });
};

export const FollowCompanyAPI = async (companyId: string) => {
  return await BaseAPI({
    path: `/followedCompany/${companyId}`,
    method: HttpMethods.POST,
  });
};

export const UnfollowCompanyAPI = async (companyId: string) => {
  return await BaseAPI({
    path: `/followedCompany/${companyId}`,
    method: HttpMethods.DELETE,
  });
};
