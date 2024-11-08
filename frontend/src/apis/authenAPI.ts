import { HttpMethods } from "../helpers/constants";
import BaseAPI from "./baseAPI";

export const LoginAPI = async (body: { email: string; password: string }) => {
  return await BaseAPI({
    path: "/login",
    method: HttpMethods.POST,
    body,
  });
};

export const LogoutAPI = async () => {
  return await BaseAPI({
    path: "/logout",
    method: HttpMethods.POST,
  });
};

export const SignUpAPI = async (body: {
  fullName: string;
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  userType: string;
}) => {
  return await BaseAPI({
    path: "/signup",
    method: HttpMethods.POST,
    body,
  });
};

export const VerifyCodeAPI = async (body: { email: string; OTP: string }) => {
  return await BaseAPI({
    path: "/verify",
    method: HttpMethods.POST,
    body,
  });
};

export const ForgotPasswordAPI = async (body: { email: string }) => {
  return await BaseAPI({
    path: "/forgotPassword",
    method: HttpMethods.POST,
    body,
  });
};

export const ResetPasswordAPI = async (
  resetToken: string,
  body: {
    password: string;
    passwordConfirm: string;
  }
) => {
  return await BaseAPI({
    path: `/resetPassword/${resetToken}`,
    method: HttpMethods.POST,
    body,
  });
};
