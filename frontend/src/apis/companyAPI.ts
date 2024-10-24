import axios from "../configs/axios.config";
export const CreateCompanyAPI = async (body: {
  logo: File;
  banner: File;
  companyName: string;
  aboutUs: string;
}) => {
  try {
    const formData = new FormData();
    formData.append("logo", body.logo);
    formData.append("banner", body.banner);
    formData.append("companyName", body.companyName);
    formData.append("aboutUs", body.aboutUs);

    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_DOMAIN}/company`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;

    // const res = await axios.post(
    //   `${import.meta.env.VITE_SERVER_DOMAIN}/company`,
    //   body
    // );
    // return res.data;
  } catch (err: any) {
    console.log(err);
    if (err) return err.response?.data;
  }
};
