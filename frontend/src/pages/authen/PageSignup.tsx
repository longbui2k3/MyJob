import { useState } from "react";
import {
  Background,
  NavigationHome,
  NavigationSignIn,
  Or,
} from "../../components/authen";
import {
  ButtonSignUpFacebook,
  ButtonSignUpGoogle,
  ButtonSubmit,
} from "../../components/buttons";
import {
  Checkbox,
  MessageError,
  MessageSuccess,
  useCheckbox,
} from "../../components/global";
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
import { Select } from "@chakra-ui/react";
import { SignUpAPI } from "../../apis";
import { useNavigate } from "react-router-dom";
import { getRoute, VERIFY_KEY } from "../../helpers/constants";
import { toastError, toastSuccess } from "../../components/toast";

export default function PageSignup() {
  const navigate = useNavigate();
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
  const [selectedUserType, setSelectedUserType] = useState<string | null>(
    "employee"
  );
  const handleSelectedUserType = (e) => {
    setSelectedUserType(e.target.value);
  };
  const { isChecked, handleCheckbox } = useCheckbox();
  const defaultMessage = {
    isShow: false,
    type: "error",
    message: "",
  };
  const [message, setMessage] = useState(defaultMessage);
  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    if (
      !inputFullName ||
      !inputUsername ||
      !inputEmail ||
      !inputPassword ||
      !inputPasswordConfirm ||
      !selectedUserType
    ) {
      return;
    }
    const data = await SignUpAPI({
      fullName: inputFullName,
      username: inputUsername,
      email: inputEmail,
      password: inputPassword,
      passwordConfirm: inputPasswordConfirm,
      userType: selectedUserType,
    });
    if (data.isSuccess) {
      toastSuccess(data.message);
      setMessage({
        isShow: true,
        type: "success",
        message: data.message,
      });
      setTimeout(() => {
        navigate(
          getRoute(VERIFY_KEY, {
            query: {
              type: "signup",
              email: inputEmail,
            },
          }).path
        );
      }, 1000);
    } else {
      toastError(data.message);
      setMessage({
        isShow: true,
        type: "error",
        message: data.message,
      });
    }
    setIsLoading(false);
  }
  return (
    <div className="relative flex h-full">
      <NavigationHome />
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
                <Select
                  width={"160px"}
                  className="my-auto"
                  onChange={handleSelectedUserType}
                >
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
            <ButtonSubmit
              label="Create Account"
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
              <ButtonSignUpGoogle />
              <ButtonSignUpFacebook />
            </div> */}
          </div>
        </form>
      </div>
      <Background />
    </div>
  );
}
