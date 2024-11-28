import { HttpMethods } from "../helpers/constants";
import { changeQueryObjToQueryStr } from "../utils";
import BaseAPI from "./baseAPI";

export const FindResumesAPI = async (query: {
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

export const FindResumeByIdAPI = async (id: string) => {
  return await BaseAPI({
    path: `/resume/${id}`,
    method: HttpMethods.GET,
  });
};

export const DeleteResumeAPI = async (id: string) => {
  return await BaseAPI({
    path: `/resume/${id}`,
    method: HttpMethods.DELETE,
  });
};

export const CreateResumeAPI = async (body: {
  name?: string;
  resumeFile?: File;
}) => {
  const formData = new FormData();
  if (body.name) formData.append("name", body.name);
  if (body.resumeFile) formData.append("resumeFile", body.resumeFile);

  return await BaseAPI({
    path: `/resume/uploaded`,
    method: HttpMethods.POST,
    body: formData,
  });
};

export const CreateCreatedResumeAPI = async (body: any) => {
  // const formData = new FormData();
  // if (body.name) formData.append("name", body.name);

  return await BaseAPI({
    path: `/resume/created`,
    method: HttpMethods.POST,
    body,
  });
};

export const UpdateResumeAPI = async (
  id: string,
  body: { name?: string | null; resumeFile?: File | null }
) => {
  const formData = new FormData();
  if (body.name) formData.append("name", body.name);
  if (body.resumeFile) formData.append("resumeFile", body.resumeFile);

  return await BaseAPI({
    path: `/resume/${id}`,
    method: HttpMethods.PATCH,
    body: formData,
  });
};

export const UpdateCreatedResumeAPI = async (id: string, body: any) => {
  return await BaseAPI({
    path: `/resume/${id}/created`,
    method: HttpMethods.PATCH,
    body,
  });
};
