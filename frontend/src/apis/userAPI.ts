import { HttpMethods } from "../helpers/constants";
import { changeQueryObjToQueryStr } from "../utils";
import BaseAPI from "./baseAPI";
export const GetUser = async () => {
  return await BaseAPI({
    path: "/user/me",
    method: HttpMethods.GET,
  });
};

export const FindAppliedJobByUser = async (query: {
  page?: number;
  limit?: number;
}) => {
  return await BaseAPI({
    path: `/user/applied-jobs?${changeQueryObjToQueryStr(query)}`,
    method: HttpMethods.GET,
  });
};

export const FindFavoriteJobByUser = async (query: {
  page?: number;
  limit?: number;
}) => {
  return await BaseAPI({
    path: `/user/favorite-jobs?${changeQueryObjToQueryStr(query)}`,
    method: HttpMethods.GET,
  });
};

export const StatisticizeJobsAPI = async () => {
  return await BaseAPI({
    path: `/user/job-statistics`,
    method: HttpMethods.GET,
  });
};

export const FindSavedCandidatesByUser = async (query: {
  page?: number;
  limit?: number;
}) => {
  return await BaseAPI({
    path: `/user/saved-candidates?${changeQueryObjToQueryStr(query)}`,
    method: HttpMethods.GET,
  });
};

export const FindProfileByUserAPI = async () => {
  return await BaseAPI({
    path: `/user/profile`,
    method: HttpMethods.GET,
  });
};

export const FindUsersAPI = async (body: {
  limit?: number;
  page?: number;
  status?: string;
  userType?: string;
  search?: string;
  allow_empty?: boolean
}) => {
  return await BaseAPI({
    path: `/user?${changeQueryObjToQueryStr(body)}`,
    method: HttpMethods.GET,
  });
};

export const ActiveUserAPI = async (userId: string) => {
  return await BaseAPI({
    path: `/user/${userId}/active`,
    method: HttpMethods.PATCH,
  });
};

export const InactiveUserAPI = async (userId: string) => {
  return await BaseAPI({
    path: `/user/${userId}/inactive`,
    method: HttpMethods.PATCH,
  });
};
