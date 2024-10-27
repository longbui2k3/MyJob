import { useState } from "react";
import {
  Background,
  NavigationHome,
  NavigationCreateAccount,
  NavigationSignInV2,
  Or,
} from "../../components/authen";
import { Heading3 } from "../../components/headings";
import { EmailInput, useEmailInput } from "../../components/inputs";
import { ButtonSubmit } from "../../components/buttons";
import {
  ButtonSignInFacebook,
  ButtonSignInGoogle,
} from "../../components/buttons/ButtonThirdParty";
import { ForgotPasswordAPI } from "../../apis";
import { MessageError, MessageSuccess } from "../../components/global";

export default function PageForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const { inputEmail, handleInputEmail, isValidEmail, isEmptyEmail } =
    useEmailInput({
      defaultValue: null,
    });
  const defaultMessage = {
    isShow: false,
    type: "error",
    message: "",
  };
  const [message, setMessage] = useState(defaultMessage);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!inputEmail) return;
    const data = await ForgotPasswordAPI({ email: inputEmail });
    if (data.isSuccess) {
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
      <NavigationHome />
      <div className="flex flex-col justify-center w-[50%]">
        <form className="w-[480px] ml-[220px]" onSubmit={handleSubmit}>
          <div>
            <Heading3 name="Forget Password" />
            <NavigationSignInV2 />
            <NavigationCreateAccount />
          </div>
          <div className="pt-[20px] space-y-4">
            <EmailInput
              value={inputEmail}
              onChange={handleInputEmail}
              isValidEmail={isValidEmail}
              isEmptyEmail={isEmptyEmail}
            />
          </div>
          <ButtonSubmit
            label="Reset Password"
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
