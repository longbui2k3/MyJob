import useInput from "../../Input/useInput";

interface UseJobTittleProps {
  defaultValue?: string | null;
}
export default function useJobTittle({
  defaultValue = null,
}: UseJobTittleProps) {
  const { input, handleInput, isEmpty } = useInput({ defaultValue });

  return {
    inputJobTittle: input,
    handleInputJobTittle: handleInput,
    isEmptyJobTittle: isEmpty,
  };
}
