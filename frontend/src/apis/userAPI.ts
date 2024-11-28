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
