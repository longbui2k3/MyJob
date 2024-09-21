import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { IoIosSearch } from "react-icons/io";
import { SlLocationPin } from "react-icons/sl";
import { ButtonSolid } from "../../buttons";

export default function SearchInput_2() {
  return (
    <div className="flex bg-white rounded-[10px] w-[550px]">
      <InputGroup width={"270px"} bg="white" className="rounded-[10px]">
        <InputLeftElement pointerEvents="none" height={"50px"}>
          <IoIosSearch size={"24px"} className="text-[--primary-500]" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Job title, keyword, company"
          fontSize="14px"
          height={"50px"}
        />
      </InputGroup>
      <InputGroup width={"180px"} bg="white">
        <InputLeftElement pointerEvents="none" height={"50px"}>
          <SlLocationPin size={"24px"} className="text-[--primary-500]" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Your Location"
          fontSize="14px"
          height={"50px"}
        />
      </InputGroup>
      <ButtonSolid children={"Find Job"} className={"my-auto flex-grow mr-1"} />
    </div>
  );
}
