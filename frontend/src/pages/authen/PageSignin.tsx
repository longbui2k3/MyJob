import {
  Background,
  Hyperlink,
  Navigation,
  NavigationCreateAccount,
  Or,
} from "../../components/authen";
import { Heading3 } from "../../components/headings";
import { ButtonSubmit } from "../../components/buttons";
import {
  ButtonSignInFacebook,
  ButtonSignInGoogle,
} from "../../components/buttons/ButtonThirdParty";
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
export default function PageSignin() {
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
    if (data.status === 200) {
      setCookie("remember", isChecked ? inputEmail : "", {});
      setCookie("jwt", data.metadata.tokens.accessToken, {
        path: "/",
      });
      setCookie("user", data.metadata.user._id, {
        path: "/",
      });
      setMessage({
        isShow: true,
        type: "success",
        message: data.message,
      });
    } else {
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
      <Navigation />
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
          <ButtonSubmit label="Sign In" isLoading={isLoading} />
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
          <Or />
          <div className="my-[15px] flex justify-between space-x-4">
            <ButtonSignInGoogle />
            <ButtonSignInFacebook />
          </div>
        </form>
      </div>
      <Background />
    </div>
  );
}
