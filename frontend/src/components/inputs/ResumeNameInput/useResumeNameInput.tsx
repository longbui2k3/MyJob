import useInput from "../Input/useInput";

interface UseResumeNameInputProps {
  defaultValue?: string | null;
}
export default function useResumeNameInput({
  defaultValue = null,
}: UseResumeNameInputProps) {
  const { input, handleInput, isEmpty } = useInput({ defaultValue });

  return {
    inputResumeName: input,
    handleInputResumeName: handleInput,
    isEmptyResumeName: isEmpty,
  };
}
