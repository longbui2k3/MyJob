import { HttpMethods } from "../helpers/constants";
import BaseAPI from "./baseAPI";

export const FindFavoriteJobAPI = async (jobId: string) => {
  return await BaseAPI({
    path: `/favoriteJob/${jobId}`,
    method: HttpMethods.GET,
  });
};

export const FavoriteJobAPI = async (jobId: string) => {
  return await BaseAPI({
    path: `/favoriteJob/${jobId}`,
    method: HttpMethods.POST,
  });
};

export const UnfavoriteJobAPI = async (jobId: string) => {
  return await BaseAPI({
    path: `/favoriteJob/${jobId}`,
    method: HttpMethods.DELETE,
  });
};
