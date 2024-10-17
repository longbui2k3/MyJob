import axios from "../configs/axios.config";
export const CreateCompanyAPI = async (
  body: { company_name: string },
  headers: { authorization: string; x_client_id: string }
) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_DOMAIN}/company`,
      body,
      { headers: headers }
    );
    return res.data;
  } catch (err: any) {
    console.log(err);
    if (err) return err.response?.data;
  }
};
