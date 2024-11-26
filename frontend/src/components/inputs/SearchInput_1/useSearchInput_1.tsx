import { useLocationSelect } from "../../select/LocationSelect";
import { useSearchJobInput } from "../SearchJobInput";

export default function useSearchInput_1() {
  const { provinceCode, setProvinceCode } = useLocationSelect();
  const { search, setSearch } = useSearchJobInput();

  return { provinceCode, setProvinceCode, search, setSearch };
}
