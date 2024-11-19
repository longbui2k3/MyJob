import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function useEducationCheckbox() {
  const [searchParams, __] = useSearchParams();
  const [educations, setEducations] = useState<Array<string>>(
    (searchParams.get("educations") &&
      searchParams.get("educations")?.split("_")) ||
      []
  );
  return { educations, setEducations };
}
