import { HttpMethods } from "../helpers/constants";
import BaseAPI from "./baseAPI";

export const CreateConversationAPI = async (participants: Array<string>) => {
  return await BaseAPI({
    path: "/conversation",
    method: HttpMethods.POST,
    body: {
      participants,
    },
  });
};

export const GetAllConversationsAPI = async () => {
  return await BaseAPI({
    path: "/conversation",
    method: HttpMethods.GET,
  });
};

export const GetConversationAPI = async (id: string) => {
  return await BaseAPI({
    path: `/conversation/${id}`,
    method: HttpMethods.GET,
  });
};

export const DeleteConversationAPI = async (id: string) => {
  return await BaseAPI({
    path: `/conversation/${id}`,
    method: HttpMethods.DELETE,
  });
};
