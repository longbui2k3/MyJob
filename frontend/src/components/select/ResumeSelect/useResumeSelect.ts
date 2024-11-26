import { useState } from "react";

export default function useResumeSelect() {
  const [resume, setResume] = useState("");
  const handleResumeChange = (e) => {
    setResume(e.target.value);
  };
  const isEmptyResume = resume === "";
  return { resume, setResume, handleResumeChange, isEmptyResume };
}
