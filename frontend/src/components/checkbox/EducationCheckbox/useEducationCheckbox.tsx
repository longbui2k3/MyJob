import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function useEducationCheckbox() {
  const [searchParams, __] = useSearchParams();
  const [educations, setEducations] = useState<Array<string>>(
    (searchParams.get("educations") &&
      searchParams.get("educations")?.split("_")) ||
      []
  );
  useEffect(() => {
    setEducations(
      (searchParams.get("educations") &&
        searchParams.get("educations")?.split("_")) ||
        []
    );
  }, [searchParams]);
  return { educations, setEducations };
}
