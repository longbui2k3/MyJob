import { HttpMethods } from "../helpers/constants";
import BaseAPI from "./baseAPI";
export const GetUser = async () => {
  return await BaseAPI({
    path: "/user/me",
    method: HttpMethods.GET
  });
};
