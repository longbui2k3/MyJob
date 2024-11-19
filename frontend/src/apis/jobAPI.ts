import { HttpMethods } from "../helpers/constants";
import { changeQueryObjToQueryStr } from "../utils";
import BaseAPI from "./baseAPI";

export const FindJobsAPI = async (query: {
  page?: number;
  limit?: number;
  search?: string;
  provinceCode?: number;
  category?: string;
  experiences?: Array<string>;
  educations?: Array<string>;
  jobLevels?: Array<string>;
  jobTypes?: Array<string>;
  salaryMin?: string;
  salaryMax?: string;
}) => {
  return await BaseAPI({
    path: `/job?${changeQueryObjToQueryStr(query)}`,
    method: HttpMethods.GET,
  });
};

export const FindJobAPI = async (id: string) => {
  return await BaseAPI({
    path: `/job/${id}`,
    method: HttpMethods.GET,
  });
};
