import { useState } from "react";
import { Navigation, Unsend } from "../../components/authen";
import { Heading3 } from "../../components/headings";
import { useVerifyCodeInput, VerifyCodeInput } from "../../components/inputs";
import { ButtonSubmit } from "../../components/buttons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { VerifyCodeAPI } from "../../apis";
import { MessageError, MessageSuccess } from "../../components/global";

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
    if (data.status === 200) {
      setMessage({
        isShow: true,
        type: "success",
        message: data.message,
      });
      setTimeout(() => {
        navigate("/signin");
      }, 1000);
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
    <div className="relative h-[100vh]">
      <Navigation isCenter={true} />
      <div className="flex justify-center w-full h-[100vh]">
        <div className="flex flex-col justify-center">
          <form className="w-[480px]" onSubmit={handleSubmit}>
            <Heading3 name="Email Verification" className="text-center" />
            <div className="mt-3 text-[--gray-500] text-[14px] font-normal leading-normal text-center">
              We've sent an verification to{" "}
              <span className="font-semibold">{searchParams.get("email")}</span>{" "}
              to verify your email address and activate your email account
            </div>
            <div className="pt-[20px] space-y-4">
              <VerifyCodeInput
                value={inputVerifyCode}
                onChange={handleInputVerifyCode}
                isEmptyVerifyCode={isEmptyVerifyCode}
              />
            </div>
            <ButtonSubmit label={"Verify My Account"} isLoading={isLoading} />
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
          <Unsend onClick={(e) => {}} className="justify-center" />
        </div>
      </div>
    </div>
  );
}
