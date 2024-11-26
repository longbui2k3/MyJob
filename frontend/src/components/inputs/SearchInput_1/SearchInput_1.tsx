import { LocationSelect } from "../../select/LocationSelect";
import { SearchJobInput } from "../SearchJobInput";
import useSearchInput_1 from "./useSearchInput_1";

export default function SearchInput_1() {
  const { provinceCode, setProvinceCode, search, setSearch } =
    useSearchInput_1();
  return (
    <form className="flex" onSubmit={() => {}}>
      <LocationSelect
        height="40px"
        width="200px"
        setProvinceCode={setProvinceCode}
        provinceCode={provinceCode}
        className="border-[1px] border-[--gray-100]"
      />
      <SearchJobInput height="40px" search={search} setSearch={setSearch} />
    </form>
  );
}
