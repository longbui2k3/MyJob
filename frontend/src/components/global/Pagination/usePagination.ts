import { useState } from "react";

export default function usePagination() {
  const [curPage, setCurPage] = useState(1);
  return { curPage, setCurPage };
}
