import { useState } from "react";

export default function useUserStatusSelect() {
  const [userStatus, setUserStatus] = useState("");
  const handleUserStatusChange = (e) => {
    setUserStatus(e.target.value);
  };
  return { userStatus, setUserStatus, handleUserStatusChange };
}
