import { useState } from "react";
import { NavigationHome, Resend } from "../../components/authen";
import { Heading3 } from "../../components/headings";
import { useVerifyCodeInput, VerifyCodeInput } from "../../components/inputs";
import { ButtonSubmit } from "../../components/buttons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ResendOtpAPI, VerifyCodeAPI } from "../../apis";
import { MessageError, MessageSuccess } from "../../components/global";
import { Text } from "../../components/text";
import { getRoute, SIGN_IN_KEY } from "../../helpers/constants";
import { toastError, toastSuccess } from "../../components/toast";

export default function PageEmailVerification() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { inputVerifyCode, handleInputVerifyCode, isEmptyVerifyCode } =
    useVerifyCodeInput({});
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
    const email = searchParams.get("email");
    if (!email || !inputVerifyCode) return "";
    const data = await VerifyCodeAPI({
      email,
      OTP: inputVerifyCode,
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

  const handleResendOTP = async (e) => {
    const email = searchParams.get("email");
    if (!email) return "";
    const data = await ResendOtpAPI({ email });
    if (data.isSuccess) {
      toastSuccess(data.message);
      setMessage({
        isShow: true,
        type: "success",
        message: data.message,
      });
      window.location.reload();
    } else {
      toastError(data.message);
      setMessage({
        isShow: true,
        type: "error",
        message: data.message,
      });
    }
  };
  return (
    <div className="relative h-[100vh]">
      <NavigationHome isCenter={true} />
      <div className="flex justify-center w-full h-[100vh]">
        <div className="flex flex-col justify-center">
          <form className="w-[480px]" onSubmit={handleSubmit}>
            <Heading3 name="Email Verification" className="text-center" />
            <Text className="text-center">
              We've sent an verification to{" "}
              <span className="font-semibold">{searchParams.get("email")}</span>{" "}
              to verify your email address and activate your email account
            </Text>
            <div className="pt-[20px] space-y-4">
              <VerifyCodeInput
                value={inputVerifyCode}
                onChange={handleInputVerifyCode}
                isEmptyVerifyCode={isEmptyVerifyCode}
              />
            </div>
            <ButtonSubmit
              label={"Verify My Account"}
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
          <Resend onClick={handleResendOTP} className="justify-center" />
        </div>
      </div>
    </div>
  );
}
