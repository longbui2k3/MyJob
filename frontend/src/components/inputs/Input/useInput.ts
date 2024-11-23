import { useState } from "react";
interface UseInputProps {
  defaultValue: string | null;
}
export default function useInput({ defaultValue }: UseInputProps) {
  const [input, setInput] = useState<string | null>(defaultValue);
  const handleInput = (e) => {
    setInput(e.target.value);
  };
  const isEmpty = input === "";
  return {
    input,
    setInput,
    handleInput,
    isEmpty,
  };
}
