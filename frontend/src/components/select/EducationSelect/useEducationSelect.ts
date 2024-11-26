import { useState } from "react";

export default function useEducationSelect() {
  const [education, setEducation] = useState("");
  const handleEducationChange = (e) => {
    setEducation(e.target.value);
  };
  return { education, setEducation, handleEducationChange };
}
