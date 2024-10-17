import { Select } from "@chakra-ui/react";
import { SearchJobInput } from "../SearchJobInput";

export default function SearchInput_1() {
  return (
    <div className="flex">
      <Select width={"120px"}></Select>
      <SearchJobInput/>
    </div>
  );
}
