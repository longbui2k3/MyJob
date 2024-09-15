import axios from "../configs/axios.config";

export const LoginAPI = async (body: {
  email: string;
  password: string;
}) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_DOMAIN}/login`,
      body
    );
    return res.data;
  } catch (err: any) {
    console.log(err);
    if (err) return err.response?.data;
  }
};

export const LogoutAPI = async () => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_DOMAIN}/logout`
    );
    return res.data;
  } catch (err: any) {
    console.log(err);
    if (err) return err.response?.data;
  }
};

export const SignUpAPI = async (body: {
  mobile?: string;
  email?: string;
  username: string;
  name: string;
  password: string;
}) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_DOMAIN}/signup`,
      body
    );
    return res.data;
  } catch (err: any) {
    console.log(err);
    if (err) return err.response?.data;
  }
};

export const VerifyCodeAPI = async (body: {
  email?: string;
  mobile?: string;
  OTP: string;
}) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_DOMAIN}/verify`,
      body
    );
    return res.data;
  } catch (err: any) {
    console.log(err);
    if (err) return err.response?.data;
  }
};

export const ForgotPasswordAPI = async (body: {
  mobile?: string;
  email?: string;
  username?: string;
}) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_DOMAIN}/forgotPassword`,
      body
    );
    return res.data;
  } catch (err: any) {
    console.log(err);
    if (err) return err.response?.data;
  }
};

export const ResetPasswordAPI = async (
  resetToken: string,
  body: {
    password: string;
    passwordConfirm: string;
  }
) => {
  try {
    const res = await axios.post(
      `${
        import.meta.env.VITE_SERVER_DOMAIN
      }/resetPassword/${resetToken}`,
      body
    );
    return res.data;
  } catch (err: any) {
    console.log(err);
    if (err) return err.response?.data;
  }
};
