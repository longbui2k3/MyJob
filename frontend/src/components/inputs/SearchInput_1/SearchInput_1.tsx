import { Input, InputGroup, InputLeftElement, Select } from "@chakra-ui/react";
import { IoIosSearch } from "react-icons/io";

export default function SearchInput_1() {
  return (
    <div className="flex">
      <Select width={"120px"}></Select>
      <InputGroup width={"450px"} bg="white">
        <InputLeftElement pointerEvents="none">
          <IoIosSearch size={"24px"} className="text-[--primary-500]" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Job title, keyword, company"
          fontSize="14px"
        />
      </InputGroup>
    </div>
  );
}
