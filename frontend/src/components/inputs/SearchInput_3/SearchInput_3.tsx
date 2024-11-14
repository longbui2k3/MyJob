import { ButtonSolid } from "../../buttons";
import { SearchJobInput } from "../SearchJobInput";
import { CategorySelect } from "../../select/CategorySelect";
import { AdvanceFilterSelect } from "../../select/AdvanceFilterSelect";
import { LocationSelect } from "../../select/LocationSelect";
import useSearchInput_3 from "./useSearchInput_3";
import { useNavigate } from "react-router-dom";
import { changeQueryObjToQueryStr } from "../../../utils";
import { useEffect, useRef, useState } from "react";
import { AdvanceFilter } from "../../global";

export default function SearchInput_3() {
  const navigate = useNavigate();
  const {
    category,
    setCategory,
    provinceCode,
    setProvinceCode,
    search,
    setSearch,
  } = useSearchInput_3();
  const [isOpenAdvanceFilter, setIsOpenAdvanceFilter] = useState(false);
  const searchRef = useRef<any>(null);
  const advanceFilterRef = useRef<any>(null);
  function getTheSameWidth(
    ref1: React.MutableRefObject<any>,
    ref2: React.MutableRefObject<any>
  ) {
    if (ref1 && ref1.current && ref2 && ref2.current)
      ref1.current.style.width = `${
        ref2?.current.getBoundingClientRect().width
      }px`;
  }
  useEffect(() => {
    getTheSameWidth(advanceFilterRef, searchRef);
  }, [searchRef, advanceFilterRef, advanceFilterRef.current]);

  return (
    <div className="relative">
      <div className="flex w-full bg-white rounded-[10px]" ref={searchRef}>
        <SearchJobInput
          width="400px"
          height="50px"
          setSearch={setSearch}
          search={search}
        />
        <LocationSelect
          height="50px"
          width="200px"
          setProvinceCode={setProvinceCode}
          provinceCode={provinceCode}
          onClick={(e) => {
            setIsOpenAdvanceFilter(false);
          }}
        />
        <CategorySelect
          height="50px"
          width="230px"
          setCategory={setCategory}
          category={category}
          onClick={(e) => {
            setIsOpenAdvanceFilter(false);
          }}
        />
        <AdvanceFilterSelect
          height="50px"
          className="grow"
          onClick={() => {
            setIsOpenAdvanceFilter(!isOpenAdvanceFilter);
          }}
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
            if (category) query["category"] = category;
            navigate(`?${changeQueryObjToQueryStr(query)}`);
            navigate(0);
          }}
        />
      </div>
      <AdvanceFilter
        ref={advanceFilterRef}
        isOpenAdvanceFilter={isOpenAdvanceFilter}
      />
    </div>
  );
}
