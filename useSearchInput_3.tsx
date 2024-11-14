import { useCategorySelect } from "../../select/CategorySelect";
import { useLocationSelect } from "../../select/LocationSelect";
import { useSearchJobInput } from "../SearchJobInput";

export default function useSearchInput_3() {
  const { category, setCategory } = useCategorySelect();
  const { provinceCode, setProvinceCode } = useLocationSelect();
  const { search, setSearch } = useSearchJobInput();
  return {
    category,
    setCategory,
    provinceCode,
    setProvinceCode,
    search,
    setSearch,
  };
}
