import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function useLocationSelect() {
  const [searchParams, __] = useSearchParams();
  const [provinceCode, setProvinceCode] = useState(
    (searchParams.get("provinceCode") &&
      Number(searchParams.get("provinceCode"))) ||
      0
  );

  useEffect(() => {
    setProvinceCode(
      (searchParams.get("provinceCode") &&
        Number(searchParams.get("provinceCode"))) ||
        0
    );
  }, [searchParams]);

  return { provinceCode, setProvinceCode };
}
