import { useState } from "react";

export default function useMaritalStatusSelect() {
  const [maritalStatus, setMaritalStatus] = useState("");
  const handleMaritalStatusChange = (e) => {
    setMaritalStatus(e.target.value);
  };
  return { maritalStatus, setMaritalStatus, handleMaritalStatusChange };
}
