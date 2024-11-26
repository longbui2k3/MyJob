import { useState } from "react";

export default function useGenderSelect() {
  const [gender, setGender] = useState("");
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };
  return { gender, setGender, handleGenderChange };
}
