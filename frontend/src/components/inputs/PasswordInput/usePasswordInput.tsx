import useInput from "../Input/useInput";

interface UsePasswordInputProps {
  defaultValue?: string | null;
}
export default function usePasswordInput({
  defaultValue = null,
}: UsePasswordInputProps) {
  const { input, handleInput, isEmpty } = useInput({ defaultValue });

  return {
    inputPassword: input,
    handleInputPassword: handleInput,
    isEmptyPassword: isEmpty,
  };
}
