import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function useExperienceCheckbox() {
  const [searchParams, __] = useSearchParams();
  const [experiences, setExperiences] = useState<Array<string>>(
    (searchParams.get("experiences") &&
      searchParams.get("experiences")?.split("_")) ||
      []
  );
  return { experiences, setExperiences };
}
