import useInput from "../Input/useInput";

interface UseUsernameInputProps {
  defaultValue?: string | null;
}
export default function useUsernameInput({
  defaultValue = null,
}: UseUsernameInputProps) {
  const { input, handleInput, isEmpty } = useInput({ defaultValue });

  return {
    inputUsername: input,
    handleInputUsername: handleInput,
    isEmptyUsername: isEmpty,
  };
}
