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
  const responses = async (method: HttpMethods) => {
    if (method === HttpMethods.POST) {
      return await axios.post(url, body);
    }
    if (method === HttpMethods.PUT) {
      return await axios.put(url, body);
    }
    if (method === HttpMethods.PATCH) {
      return await axios.patch(url, body);
    }
    if (method === HttpMethods.DELETE) {
      return await axios.delete(url);
    }
    return await axios.get(url);
  };
  console.log(method);
  try {
    const res = await responses(method);
    return res.data;
  } catch (err: any) {
    console.log(err);
    if (err) return err.response?.data;
  }
}
