import { HttpMethods } from "../helpers/constants";
import { changeQueryObjToQueryStr } from "../utils";
import BaseAPI from "./baseAPI";

export const CreateApplicationAPI = async (body: {
  job: string;
  resume: string;
  coverLetter: string | null;
}) => {
  return await BaseAPI({
    path: `/application`,
    method: HttpMethods.POST,
    body,
  });
};

export const FindApplicationsAPI = async (query: {
  page?: number;
  limit?: number;
  job?: string;
  status?: string;
}) => {
  return await BaseAPI({
    path: `/application?${changeQueryObjToQueryStr(query)}`,
    method: HttpMethods.GET,
  });
};

export const UpdateApplicationAPI = async (
  id: string,
  body: { status: string }
) => {
  return await BaseAPI({
    path: `/application/${id}`,
    method: HttpMethods.PATCH,
    body,
  });
};
