import { useNavigate } from "react-router-dom";
import { ButtonSolid } from "../../buttons";
import { LocationSelect } from "../../select/LocationSelect";
import { SearchJobInput } from "../SearchJobInput";
import { useSearchInput_1 } from "../SearchInput_1";
import { changeQueryObjToQueryStr } from "../../../utils";

export default function SearchInput_2() {
  const navigate = useNavigate();
  const { provinceCode, setProvinceCode, search, setSearch } =
    useSearchInput_1();
  return (
    <div className="flex bg-white rounded-[10px] w-[550px]">
      <SearchJobInput
        width="270px"
        height="50px"
        search={search}
        setSearch={setSearch}
      />
      <LocationSelect
        height="50px"
        width="200px"
        setProvinceCode={setProvinceCode}
        provinceCode={provinceCode}
        className="border-[1px] border-[--gray-100]"
      />
      <ButtonSolid
        children={"Find Job"}
        className={"my-auto flex-grow mr-1"}
        onClick={(e) => {
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
      />
    </div>
  );
}
