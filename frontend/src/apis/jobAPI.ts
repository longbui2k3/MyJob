import { HttpMethods } from "../helpers/constants";
import { changeQueryObjToQueryStr } from "../utils";
import BaseAPI from "./baseAPI";

export const FindJobsAPI = async (query: {
  page?: number;
  limit?: number;
  search?: string;
  provinceCode?: number;
  category?: string;
}) => {
  return await BaseAPI({
    path: `/job?${changeQueryObjToQueryStr(query)}`,
    method: HttpMethods.GET,
  });
};
