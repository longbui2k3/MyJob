import useInput from "../Input/useInput";

interface UseCategoryNameInputProps {
  defaultValue?: string | null;
}
export default function useCategoryNameInput({
  defaultValue = null,
}: UseCategoryNameInputProps) {
  const { input, handleInput, isEmpty } = useInput({ defaultValue });

  return {
    inputCategoryName: input,
    handleInputCategoryName: handleInput,
    isEmptyCategoryName: isEmpty,
  };
}
