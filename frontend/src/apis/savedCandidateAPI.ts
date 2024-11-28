import { HttpMethods } from "../helpers/constants";
import BaseAPI from "./baseAPI";

export const FindSavedCandidateAPI = async (profileId: string) => {
  return await BaseAPI({
    path: `/savedCandidate/${profileId}`,
    method: HttpMethods.GET,
  });
};

export const SavedCandidateAPI = async (profileId: string) => {
  return await BaseAPI({
    path: `/savedCandidate/${profileId}`,
    method: HttpMethods.POST,
  });
};

export const UnsavedCandidateAPI = async (profileId: string) => {
  return await BaseAPI({
    path: `/savedCandidate/${profileId}`,
    method: HttpMethods.DELETE,
  });
};
