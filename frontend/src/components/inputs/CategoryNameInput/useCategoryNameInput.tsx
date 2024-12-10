import useInput from "../Input/useInput";

interface UseCategoryNameInputProps {
  defaultValue?: string | null;
}
export default function useCategoryNameInput({
  defaultValue = null,
}: UseCategoryNameInputProps) {
  const { input, setInput, handleInput, isEmpty } = useInput({ defaultValue });

  return {
    inputCategoryName: input,
    setInputCategoryName: setInput,
    handleInputCategoryName: handleInput,
    isEmptyCategoryName: isEmpty,
  };
}
