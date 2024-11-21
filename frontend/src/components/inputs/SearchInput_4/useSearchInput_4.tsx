import { useLocationSelect } from "../../select/LocationSelect";
import { useOrganizationTypeSelect } from "../../select/OrganizationTypeSelect";
import { useSearchJobInput } from "../SearchJobInput";

export default function useSearchInput_4() {
  const { provinceCode, setProvinceCode } = useLocationSelect();
  const { organizationType, setOrganizationType } = useOrganizationTypeSelect();
  const { search, setSearch } = useSearchJobInput();

  return {
    provinceCode,
    setProvinceCode,
    search,
    setSearch,
    organizationType,
    setOrganizationType,
  };
}
