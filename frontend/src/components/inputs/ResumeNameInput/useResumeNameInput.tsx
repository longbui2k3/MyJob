import useInput from "../Input/useInput";

interface UseResumeNameInputProps {
  defaultValue?: string | null;
}
export default function useResumeNameInput({
  defaultValue = null,
}: UseResumeNameInputProps) {
  const { input, handleInput, isEmpty, setInput } = useInput({ defaultValue });

  return {
    inputResumeName: input,
    setInputResumeName: setInput,
    handleInputResumeName: handleInput,
    isEmptyResumeName: isEmpty,
  };
}
