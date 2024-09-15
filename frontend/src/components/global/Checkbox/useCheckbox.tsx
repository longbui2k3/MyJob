import { useState } from "react";

export default function useCheckbox() {
  const [isChecked, setIsChecked] = useState(false);
  function handleCheckbox() {
    setIsChecked(!isChecked);
  }
  return {
    isChecked,
    handleCheckbox,
  };
}
