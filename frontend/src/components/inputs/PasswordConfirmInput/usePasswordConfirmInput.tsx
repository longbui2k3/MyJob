import useInput from "../Input/useInput";

interface UsePasswordConfirmInputProps {
  defaultValue?: string | null;
}
export default function usePasswordConfirmInput({
  defaultValue = null,
}: UsePasswordConfirmInputProps) {
  const { input, handleInput, isEmpty } = useInput({ defaultValue });

  return {
    inputPasswordConfirm: input,
    handleInputPasswordConfirm: handleInput,
    isEmptyPasswordConfirm: isEmpty,
  };
}
