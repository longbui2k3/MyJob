import { HttpMethods } from "../helpers/constants";
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
