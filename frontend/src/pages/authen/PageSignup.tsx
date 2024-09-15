import { useState } from "react";
import {
  Background,
  Navigation,
  NavigationSignIn,
  Or,
} from "../../components/authen";
import { ButtonSubmit } from "../../components/buttons";
import { Checkbox, useCheckbox } from "../../components/global";
import { Heading3 } from "../../components/headings";
import {
  EmailInput,
  FullNameInput,
  PasswordConfirmInput,
  PasswordInput,
  useEmailInput,
  useFullNameInput,
  usePasswordConfirmInput,
  usePasswordInput,
  UsernameInput,
  useUsernameInput,
} from "../../components/inputs";
import {
  ButtonSignUpFacebook,
  ButtonSignUpGoogle,
} from "../../components/buttons/ButtonThirdParty";
import { Select } from "@chakra-ui/react";

export default function PageSignup() {
  const [isLoading, setIsLoading] = useState(false);
  const { inputEmail, handleInputEmail, isValidEmail, isEmptyEmail } =
    useEmailInput({
      defaultValue: null,
    });
  const { inputPassword, handleInputPassword, isEmptyPassword } =
    usePasswordInput({
      defaultValue: null,
    });
  const {
    inputPasswordConfirm,
    handleInputPasswordConfirm,
    isEmptyPasswordConfirm,
  } = usePasswordConfirmInput({
    defaultValue: null,
  });
  const { inputFullName, handleInputFullName, isEmptyFullName } =
    useFullNameInput({
      defaultValue: null,
    });
  const { inputUsername, handleInputUsername, isEmptyUsername } =
    useUsernameInput({
      defaultValue: null,
    });
  const { isChecked, handleCheckbox } = useCheckbox();
  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setIsLoading(false);
  }
  return (
    <div className="relative flex h-full">
      <Navigation />
      <div className="w-[50%]">
        <form
          className="w-[480px] ml-[220px] mt-[120px]"
          onSubmit={handleSubmit}
        >
          <div>
            <div className="flex justify-between">
              <div>
                <Heading3 name="Create account" />
                <NavigationSignIn />
              </div>
              <div className="flex flex-col text-[14px] justify-center">
                <Select placeholder="Roles" width={"160px"} className="my-auto">
                  <option value="employee">{"Employee"}</option>
                  <option value="employer">{"Employer"}</option>
                </Select>
              </div>
            </div>
            <div className="pt-[20px] space-y-4">
              <div className="flex justify-between space-x-4">
                <FullNameInput
                  value={inputFullName}
                  onChange={handleInputFullName}
                  isEmptyFullName={isEmptyFullName}
                  className="w-full"
                />
                <UsernameInput
                  value={inputUsername}
                  onChange={handleInputUsername}
                  isEmptyUsername={isEmptyUsername}
                  className="w-full"
                />
              </div>
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
              <PasswordConfirmInput
                value={inputPasswordConfirm}
                onChange={handleInputPasswordConfirm}
                isEmptyPasswordConfirm={isEmptyPasswordConfirm}
              />
            </div>
            <div className="mt-5">
              <Checkbox
                label={
                  <>
                    I've read and agree with your{" "}
                    <a href="/" className="text-[--primary-600] font-semibold">
                      Terms of Services
                    </a>
                  </>
                }
                onChange={handleCheckbox}
              />
            </div>
            <ButtonSubmit label="Create Account" isLoading={isLoading} />
            <Or />
            <div className="my-[15px] flex justify-between space-x-4">
              <ButtonSignUpGoogle />
              <ButtonSignUpFacebook />
            </div>
          </div>
        </form>
      </div>
      <Background />
    </div>
  );
}
