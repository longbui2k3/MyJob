import { useState } from "react";

export default function usePageLimitSelect() {
  const [limit, setLimit] = useState(8);

  function handleLimitChange(e: any) {
    setLimit(e.target.value);
  }

  return { limit, handleLimitChange };
}
