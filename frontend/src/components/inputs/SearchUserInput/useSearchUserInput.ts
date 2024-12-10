import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function useSearchJobInput() {
  const [searchParams, __] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search"));
  return { search, setSearch };
}
