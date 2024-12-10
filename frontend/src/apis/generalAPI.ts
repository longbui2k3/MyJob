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

export const GeneralStatisticsAPI = async () => {
  return await BaseAPI({
    path: `/general/statistics`,
    method: HttpMethods.GET,
  });
}
