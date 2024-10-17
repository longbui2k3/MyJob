import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { IoIosSearch } from "react-icons/io";

interface SearchJobInputProps {
  width?: string;
  height?: string;
}

export default function SearchJobInput({
  width = "450px",
  height
}: SearchJobInputProps) {
  return (
    <InputGroup width={width} bg="white">
      <InputLeftElement pointerEvents="none" height={height}>
        <IoIosSearch size={"24px"} className="text-[--primary-500]" />
      </InputLeftElement>
      <Input
        type="text"
        placeholder="Job title, keyword, company,..."
        fontSize="14px"
        height={height}
      />
    </InputGroup>
  );
}
