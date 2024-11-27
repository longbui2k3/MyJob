import { HttpMethods } from "../helpers/constants";
import { changeQueryObjToQueryStr } from "../utils";
import BaseAPI from "./baseAPI";

export const FindJobsAPI = async (query: {
  page?: number;
  limit?: number;
  search?: string;
  provinceCode?: number;
  company?: string;
  category?: string;
  status?: string;
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

export const CreateJobAPI = async (body: {
  jobTitle: string;
  category: string;
  // tags: string[];
  jobRole: string;
  minSalary: number | null;
  maxSalary: number | null;
  salaryType: string;
  education: string;
  experience: string;
  jobType: string;
  vacancies: number | null;
  expirationDate: string;
  jobLevel: string;
  applyJobOn: string;
  jobDescription: string;
  jobResponsibilities: string;
}) => {
  return await BaseAPI({
    path: `/job`,
    method: HttpMethods.POST,
    body,
  });
};

export const UpdateJobAPI = async (
  id: string,
  body: {
    jobTitle?: string;
    category?: string;
    // tags: string[];
    jobRole?: string;
    minSalary?: number | null;
    maxSalary?: number | null;
    salaryType?: string;
    education?: string;
    experience?: string;
    jobType?: string;
    vacancies?: number | null;
    expirationDate?: string;
    jobLevel?: string;
    applyJobOn?: string;
    jobDescription?: string;
    jobResponsibilities?: string;
  }
) => {
  return await BaseAPI({
    path: `/job/${id}`,
    method: HttpMethods.PATCH,
    body,
  });
};

export const FindJobAPI = async (id: string) => {
  return await BaseAPI({
    path: `/job/${id}`,
    method: HttpMethods.GET,
  });
};
