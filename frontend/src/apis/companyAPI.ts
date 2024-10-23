import axios from "../configs/axios.config";
export const CreateCompanyAPI = async (body: {
  companyName: string;
  //logo: File;
  //banner: File;
}) => {
  try {
    // const formData = new FormData();
    // formData.append("company_name", body.companyName);
    // formData.append("logo", body.logo);
    // formData.append("banner", body.banner);
    // const res = await axios.post(
    //   `${import.meta.env.VITE_SERVER_DOMAIN}/company`,
    //   formData,
    //   {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   }
    // );
    // return res.data;

    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_DOMAIN}/company`,
      body
    );
    return res.data;
  } catch (err: any) {
    console.log(err);
    if (err) return err.response?.data;
  }
};
