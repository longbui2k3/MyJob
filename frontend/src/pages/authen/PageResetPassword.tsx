import { useState } from "react";
import { NavigationHome } from "../../components/authen";
import { ButtonSubmit } from "../../components/buttons";
import { Heading3 } from "../../components/headings";
import {
  PasswordConfirmInput,
  PasswordInput,
  usePasswordConfirmInput,
  usePasswordInput,
} from "../../components/inputs";
import { useNavigate, useParams } from "react-router-dom";
import { ResetPasswordAPI } from "../../apis/authenAPI";
import { MessageError, MessageSuccess } from "../../components/global";
import { Text } from "../../components/text";
import { getRoute, SIGN_IN_KEY } from "../../helpers/constants";
import { toastError, toastSuccess } from "../../components/toast";

export default function PageResetPassword() {
  const navigate = useNavigate();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { inputPassword, handleInputPassword, isEmptyPassword } =
    usePasswordInput({});
  const {
    inputPasswordConfirm,
    handleInputPasswordConfirm,
    isEmptyPasswordConfirm,
  } = usePasswordConfirmInput({});
  const defaultMessage = {
    isShow: false,
    type: "error",
    message: "",
  };
  const [message, setMessage] = useState(defaultMessage);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!params.token || !inputPassword || !inputPasswordConfirm) return;
    const data = await ResetPasswordAPI(params.token, {
      password: inputPassword,
      passwordConfirm: inputPasswordConfirm,
    });
    if (data.isSuccess) {
      toastSuccess(data.message);
      setMessage({
        isShow: true,
        type: "success",
        message: data.message,
      });
      setTimeout(() => {
        navigate(getRoute(SIGN_IN_KEY).path);
      }, 500);
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
    <div className="relative h-[100vh]">
      <NavigationHome isCenter={true} />
      <div className="flex justify-center w-full h-[100vh]">
        <div className="flex flex-col justify-center">
          <form className="w-[480px]" onSubmit={handleSubmit}>
            <Heading3 name="Reset Password" className="text-center" />
            <Text className="text-center">
              Duis luctus interdum metus, ut consectetur ante consectetur sed.
              Suspendisse euismod viverra massa sit amet mollis
            </Text>
            <div className="pt-[20px] space-y-4">
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
            <ButtonSubmit
              label={"Reset Password"}
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
          </form>
        </div>
      </div>
    </div>
  );
}
