import axios from "../configs/axios.config";
import { HttpMethods } from "../helpers/constants";

interface BaseAPIProps {
  path: string;
  method?: HttpMethods;
  body?: object;
}
export default async function BaseAPI({
  path,
  method = HttpMethods.GET,
  body,
}: BaseAPIProps) {
  const url = `${import.meta.env.VITE_SERVER_DOMAIN}` + path;
  const responses = {
    get: axios.get(url),
    post: axios.post(url, body),
    put: axios.put(url, body),
    patch: axios.patch(url, body),
    delete: axios.delete(url),
  };
  try {
    const res = await responses[method];
    return res.data;
  } catch (err: any) {
    console.log(err);
    if (err) return err.response?.data;
  }
}
