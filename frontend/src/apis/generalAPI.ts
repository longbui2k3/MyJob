import { HttpMethods } from "../helpers/constants";
import BaseAPI from "./baseAPI";

export const SendEmailAPI = async (body: {
  toList: string[];
  subject: string;
  html: string;
}) => {
  return await BaseAPI({
    path: `/general/email`,
    method: HttpMethods.POST,
    body,
  });
};
