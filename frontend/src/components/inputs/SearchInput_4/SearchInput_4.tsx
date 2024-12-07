import { ButtonSolid } from "../../buttons";
import { SearchJobInput } from "../SearchJobInput";
import { LocationSelect } from "../../select/LocationSelect";
import useSearchInput_4 from "./useSearchInput_4";
import { useNavigate } from "react-router-dom";
import { changeQueryObjToQueryStr } from "../../../utils";
import { OrganizationTypeSelect } from "../../select/OrganizationTypeSelect";

export default function SearchInput_4() {
  const navigate = useNavigate();
  const {
    provinceCode,
    setProvinceCode,
    search,
    setSearch,
    organizationType,
    setOrganizationType,
  } = useSearchInput_4();

  return (
    <div className="relative">
      <div className="search-input-3 flex w-full bg-white rounded-[10px]">
        <SearchJobInput
          width="600px"
          height="50px"
          setSearch={setSearch}
          search={search}
          placeholder="Company name, keyword"
        />
        <LocationSelect
          height="50px"
          width="200px"
          setProvinceCode={setProvinceCode}
          provinceCode={provinceCode}
        />
        <OrganizationTypeSelect
          width="300px"
          height="50px"
          setOrganizationType={setOrganizationType}
          organizationType={organizationType}
        />
        <ButtonSolid
          children={"Find Job"}
          className={"my-auto mr-1 w-[100px]"}
          onClick={() => {
            const query: {
              [key: string]: any;
            } = {};
            if (search) query["search"] = search;
            if (provinceCode) query["provinceCode"] = provinceCode;
            if (organizationType >= 0) query["org_type"] = organizationType;
            navigate(`?${changeQueryObjToQueryStr(query)}`);
            // navigate(0);
          }}
        />
      </div>
    </div>
  );
}
