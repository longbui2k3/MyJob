import { HttpMethods } from "../helpers/constants";
import { changeQueryObjToQueryStr } from "../utils";
import BaseAPI from "./baseAPI";
export const CreateCategoryAPI = async (body: {
  name?: string | null;
  imageUrl: File | null;
  iconUrl: File | null;
}) => {
  const formData = new FormData();
  if (body.name) formData.append("name", body.name);
  if (body.imageUrl) formData.append("imageUrl", body.imageUrl);
  if (body.iconUrl) formData.append("iconUrl", body.iconUrl);
  return await BaseAPI({
    path: "/category",
    method: HttpMethods.POST,
    body: formData,
  });
};

export const FindAllCategoriesAPI = async (body: {
  limit?: number;
  page?: number;
}) => {
  return await BaseAPI({
    path: `/category?${changeQueryObjToQueryStr(body)}`,
    method: HttpMethods.GET,
  });
};
