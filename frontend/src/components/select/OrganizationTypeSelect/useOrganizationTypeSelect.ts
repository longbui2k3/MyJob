import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function useOrganizationTypeSelect() {
  const [searchParams, __] = useSearchParams();
  const [organizationType, setOrganizationType] = useState(
    searchParams.get("org_type") &&
      Number(searchParams.get("org_type")) >= 0
      ? Number(searchParams.get("org_type"))
      : -1
  );

  return { organizationType, setOrganizationType };
}
