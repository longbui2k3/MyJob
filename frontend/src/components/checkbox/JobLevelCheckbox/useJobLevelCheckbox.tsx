import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function useJobLevelCheckbox() {
  const [searchParams, __] = useSearchParams();
  const [jobLevels, setJobLevels] = useState<Array<string>>(
    (searchParams.get("jobLevels") &&
      searchParams.get("jobLevels")?.split("_")) ||
      []
  );
  return { jobLevels, setJobLevels };
}
