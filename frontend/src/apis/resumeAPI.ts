import { HttpMethods } from "../helpers/constants";
import { changeQueryObjToQueryStr } from "../utils";
import BaseAPI from "./baseAPI";

export const FindResumes = async (query: {
  user?: string;
  page?: string;
  limit?: string;
  type?: string;
}) => {
  return await BaseAPI({
    path: `/resume?${changeQueryObjToQueryStr(query)}`,
    method: HttpMethods.GET,
  });
};

export const FindResumeById = async (id: string) => {
  return await BaseAPI({
    path: `/resume/${id}`,
    method: HttpMethods.GET,
  });
};

export const DeleteResume = async (id: string) => {
  return await BaseAPI({
    path: `/resume/${id}`,
    method: HttpMethods.DELETE,
  });
};

export const CreateResume = async ({}) => {
    
}

