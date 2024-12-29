import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function useJobTypeCheckbox() {
  const [searchParams, __] = useSearchParams();
  const [jobTypes, setJobTypes] = useState<Array<string>>(
    (searchParams.get("jobTypes") &&
      searchParams.get("jobTypes")?.split("_")) ||
      []
  );
  useEffect(() => {
    setJobTypes(
      (searchParams.get("jobTypes") &&
        searchParams.get("jobTypes")?.split("_")) ||
        []
    );
  }, [searchParams]);
  return { jobTypes, setJobTypes };
}
