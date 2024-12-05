import { HttpMethods } from "../helpers/constants";
import BaseAPI from "./baseAPI";

export const FindSavedCandidateAPI = async (applicationId: string) => {
  return await BaseAPI({
    path: `/savedCandidate/${applicationId}`,
    method: HttpMethods.GET,
  });
};

export const SavedCandidateAPI = async (applicationId: string) => {
  return await BaseAPI({
    path: `/savedCandidate/${applicationId}`,
    method: HttpMethods.POST,
  });
};

export const UnsavedCandidateAPI = async (applicationId: string) => {
  return await BaseAPI({
    path: `/savedCandidate/${applicationId}`,
    method: HttpMethods.DELETE,
  });
};
