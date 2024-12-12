import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function useJobLevelCheckbox() {
  const [searchParams, __] = useSearchParams();
  const [jobLevels, setJobLevels] = useState<Array<string>>(
    (searchParams.get("jobLevels") &&
      searchParams.get("jobLevels")?.split("_")) ||
      []
  );
  useEffect(() => {
    setJobLevels(
      (searchParams.get("jobLevels") &&
        searchParams.get("jobLevels")?.split("_")) ||
        []
    );
  }, [searchParams]);
  return { jobLevels, setJobLevels };
}
