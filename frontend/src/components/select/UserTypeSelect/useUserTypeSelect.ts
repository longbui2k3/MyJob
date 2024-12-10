import { useState } from "react";

export default function useUserTypeSelect() {
  const [userType, setUserType] = useState("");
  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };
  return { userType, setUserType, handleUserTypeChange };
}
