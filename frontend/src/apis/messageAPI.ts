import { HttpMethods } from "../helpers/constants";
import { changeQueryObjToQueryStr } from "../utils";
import BaseAPI from "./baseAPI";

export const CreateMessageAPI = async (body: {
  conversation: string;
  message?: string;
  file?: File;
  replyMessage?: string;
  react?: string;
}) => {
  const formData = new FormData();
  formData.append("conversation", body.conversation);
  if (body.message) formData.append("message", body.message);
  if (body.file) formData.append("file", body.file);
  if (body.replyMessage) formData.append("replyMessage", body.replyMessage);
  if (body.react) formData.append("react", body.react);

  return await BaseAPI({
    path: "/message",
    method: HttpMethods.POST,
    body: formData,
  });
};

export const FindMessagesByConversationAPI = async (query: {
  conversation?: string;
  page?: number;
}) => {
  return await BaseAPI({
    path: `/message?${changeQueryObjToQueryStr(query)}`,
    method: HttpMethods.GET,
  });
};

export const DeleteMessageAPI = async (messageId: string) => {
  return await BaseAPI({
    path: `/message/${messageId}`,
    method: HttpMethods.DELETE,
  });
};
