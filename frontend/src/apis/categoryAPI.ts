import axios from "../configs/axios.config";
import { HttpMethods } from "../helpers/constants";
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

export const FindAllCategoriesAPI = async (limit?: number) => {
  let query = "";
  if (limit) {
    query = query + `limit=${limit}`;
  }
  return await BaseAPI({
    path: `/category?${query}`,
    method: HttpMethods.GET,
  });
};
