import useInput from "../Input/useInput";

interface UseFullNameInputProps {
  defaultValue?: string | null;
}
export default function useFullNameInput({
  defaultValue = null,
}: UseFullNameInputProps) {
  const { input, handleInput, isEmpty } = useInput({ defaultValue });

  return {
    inputFullName: input,
    handleInputFullName: handleInput,
    isEmptyFullName: isEmpty,
  };
}
