import { useState } from "react";
import {
  Background,
  Navigation,
  NavigationCreateAccount,
  NavigationSignInV2,
  Or,
} from "../../components/authen";
import { Heading3 } from "../../components/headings";
import { EmailInput, useEmailInput } from "../../components/inputs";
import { ButtonSubmit } from "../../components/buttons";
import { ButtonSignInFacebook, ButtonSignInGoogle } from "../../components/buttons/ButtonThirdParty";

export default function PageForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const { inputEmail, handleInputEmail, isValidEmail, isEmptyEmail } =
    useEmailInput({
      defaultValue: null,
    });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    setIsLoading(false);
  };
  return (
    <div className="relative flex h-[100vh]">
      <Navigation />
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
          <ButtonSubmit label="Reset Password" isLoading={isLoading} />
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
