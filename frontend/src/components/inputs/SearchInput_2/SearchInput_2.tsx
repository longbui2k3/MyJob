import { ButtonSolid } from "../../buttons";
import { SearchJobInput } from "../SearchJobInput";
import { SearchLocationInput } from "../SearchLocationInput";

export default function SearchInput_2() {
  return (
    <div className="flex bg-white rounded-[10px] w-[550px]">
      <SearchJobInput width="270px" height="50px" />
      <SearchLocationInput />
      <ButtonSolid children={"Find Job"} className={"my-auto flex-grow mr-1"} />
    </div>
  );
}
