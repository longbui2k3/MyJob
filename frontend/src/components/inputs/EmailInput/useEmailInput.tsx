import { checkIsValidEmail } from "../../../utils";
import useInput from "../Input/useInput";

interface UseEmailInputProps {
  defaultValue?: string | null;
}
export default function useEmailInput({
  defaultValue = null,
}: UseEmailInputProps) {
  const { input, handleInput, isEmpty } = useInput({ defaultValue });
  const isValidEmail = input !== null ? checkIsValidEmail(input) : true;
  return {
    inputEmail: input,
    handleInputEmail: handleInput,
    isValidEmail,
    isEmptyEmail: isEmpty,
  };
}
