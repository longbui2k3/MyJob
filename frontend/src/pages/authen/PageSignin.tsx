import {
  Background,
  Hyperlink,
  NavigationHome,
  NavigationCreateAccount,
  Or,
} from "../../components/authen";
import { Heading3 } from "../../components/headings";
import {
  ButtonSignInFacebook,
  ButtonSignInGoogle,
  ButtonSubmit,
} from "../../components/buttons";
import {
  Checkbox,
  MessageError,
  MessageSuccess,
  useCheckbox,
} from "../../components/global";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { LoginAPI } from "../../apis";
import {
  EmailInput,
  PasswordInput,
  useEmailInput,
  usePasswordInput,
} from "../../components/inputs";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context";
import {
  DASHBOARD_OVERVIEW_KEY,
  DEFAULT_KEY,
  getRoute,
  UserTypes,
} from "../../helpers/constants";
import { toastError, toastSuccess } from "../../components/toast";
export default function PageSignin() {
  const { setUserId, user } = useAuthContext();
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["jwt", "remember", "user"]);
  const { inputEmail, handleInputEmail, isValidEmail, isEmptyEmail } =
    useEmailInput({
      defaultValue: cookies.remember ? cookies.remember.trim() : null,
    });
  const { inputPassword, handleInputPassword, isEmptyPassword } =
    usePasswordInput({
      defaultValue: null,
    });
  const { isChecked, handleCheckbox } = useCheckbox();
  const [isLoading, setIsLoading] = useState(false);
  const defaultMessage = {
    isShow: false,
    type: "error",
    message: "",
  };
  const [message, setMessage] = useState(defaultMessage);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!inputEmail || !inputPassword) return;
    const data = await LoginAPI({ email: inputEmail, password: inputPassword });
    if (data.isSuccess) {
      toastSuccess(data.message);
      setCookie("remember", isChecked ? inputEmail : "", {});
      setCookie("jwt", data.metadata.tokens.accessToken, {
        path: "/",
      });
      setCookie("user", data.metadata.user._id, {
        path: "/",
      });
      setUserId(data.metadata.user._id);
      setMessage({
        isShow: true,
        type: "success",
        message: data.message,
      });
      setTimeout(() => {
        if (data.metadata.user.userType === UserTypes.EMPLOYEE)
          navigate(getRoute(DEFAULT_KEY).path, { replace: true });
        else navigate(getRoute(DASHBOARD_OVERVIEW_KEY).path, { replace: true });
      }, 100);
    } else {
      toastError(data.message);
      setMessage({
        isShow: true,
        type: "error",
        message: data.message,
      });
    }
    setIsLoading(false);
  };
  return (
    <div className="relative flex h-[100vh]">
      <NavigationHome />
      <div className="flex flex-col justify-center w-[50%]">
        <form className="w-[480px] ml-[220px]" onSubmit={handleSubmit}>
          <div>
            <Heading3 name="Sign in" />
            <NavigationCreateAccount />
          </div>
          <div className="pt-[20px] space-y-4">
            <EmailInput
              value={inputEmail}
              onChange={handleInputEmail}
              isValidEmail={isValidEmail}
              isEmptyEmail={isEmptyEmail}
            />
            <PasswordInput
              value={inputPassword}
              onChange={handleInputPassword}
              isEmptyPassword={isEmptyPassword}
            />
          </div>
          <div className="flex justify-between mt-5">
            <Checkbox label="Remember Me" onChange={handleCheckbox} />
            <Hyperlink href="/forgotpassword" label="Forget password" />
          </div>
          <ButtonSubmit
            label="Sign In"
            isLoading={isLoading}
            className="mt-[25px] "
          />
          {message.isShow ? (
            message.type === "error" ? (
              <MessageError
                content={message.message}
                className="text-center mt-5"
              />
            ) : (
              <MessageSuccess
                content={message.message}
                className="text-center mt-5"
              />
            )
          ) : (
            ""
          )}
          {/* <Or />
          <div className="my-[15px] flex justify-between space-x-4">
            <ButtonSignInGoogle />
            <ButtonSignInFacebook />
          </div> */}
        </form>
      </div>
      <Background />
    </div>
  );
}
