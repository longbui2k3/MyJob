import { HttpMethods } from "../helpers/constants";
import BaseAPI from "./baseAPI";
export const ResendOtpAPI = async (body: { email: string }) => {
  return await BaseAPI({
    path: "/otp",
    method: HttpMethods.POST,
    body,
  });
};
