import useInput from "../Input/useInput";

interface UseVerifyCodeInputProps {
  defaultValue?: string | null;
}

export default function useVerifyCodeInput({
  defaultValue = null,
}: UseVerifyCodeInputProps) {
  const { input, handleInput, isEmpty } = useInput({ defaultValue });
  return {
    inputVerifyCode: input,
    handleInputVerifyCode: handleInput,
    isEmptyVerifyCode: isEmpty,
  };
}
