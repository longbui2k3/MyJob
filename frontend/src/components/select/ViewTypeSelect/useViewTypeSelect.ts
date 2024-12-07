import { useState } from "react";
import { ViewTypes } from "../../../helpers/constants";

export default function useViewTypeSelect() {
  const [viewType, setViewType] = useState(ViewTypes.GRID);

  return {
    viewType,
    setViewType,
  };
}
