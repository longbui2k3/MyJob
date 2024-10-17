import { ButtonSolid } from "../../buttons";
import { SearchJobInput } from "../SearchJobInput";
import { SearchLocationInput } from "../SearchLocationInput";
import { CategorySelect } from "../../select/CategorySelect";
import { AdvanceFilterSelect } from "../../select/AdvanceFilterSelect";

export default function SearchInput_3() {
  return (
    <div className="flex w-full bg-white rounded-[10px]">
      <SearchJobInput width="380px" height="50px" />
      <SearchLocationInput height="50px" width="250px" />
      <CategorySelect height="50px" width="230px" />
      <AdvanceFilterSelect height="50px" className="grow"/>
      <ButtonSolid children={"Find Job"} className={"my-auto mr-1 w-[100px]"} />
    </div>
  );
}
