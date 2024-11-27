import { useNavigate } from "react-router-dom";
import { LocationSelect } from "../../select/LocationSelect";
import { SearchJobInput } from "../SearchJobInput";
import useSearchInput_1 from "./useSearchInput_1";
import { changeQueryObjToQueryStr } from "../../../utils";

export default function SearchInput_1() {
  const navigate = useNavigate();
  const { provinceCode, setProvinceCode, search, setSearch } =
    useSearchInput_1();
  return (
    <form
      className="flex items-center"
      onSubmit={(e) => {
        e.preventDefault();
        if (!provinceCode && !search) return;
        navigate(
          `/jobs?${changeQueryObjToQueryStr({
            provinceCode: provinceCode || undefined,
            search: search || undefined,
          })}`
        );
        navigate(0);
      }}
    >
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
