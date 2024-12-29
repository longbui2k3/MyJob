import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function useCategorySelect() {
  const [searchParams, __] = useSearchParams();
  const [category, setCategory] = useState(searchParams.get("category") || "");
  useEffect(() => {
    setCategory(searchParams.get("category") || "");
  }, [searchParams]);
  return {
    category,
    setCategory,
  };
}
