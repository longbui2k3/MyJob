import { useState } from "react";

export default function useExperienceSelect() {
  const [experience, setExperience] = useState("");
  const handleExperienceChange = (e) => {
    setExperience(e.target.value);
  };
  return { experience, handleExperienceChange };
}
