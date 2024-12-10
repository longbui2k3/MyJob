import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { IoIosSearch } from "react-icons/io";

interface SearchJobInputProps {
  width?: string;
  height?: string;
  search?: string | null;
  setSearch?: React.Dispatch<React.SetStateAction<string | null>>;
  placeholder?: string;
}

export default function SearchJobInput({
  width = "450px",
  height,
  search = "",
  setSearch = () => {},
  placeholder = "Job title, keyword,...",
}: SearchJobInputProps) {
  return (
    <InputGroup width={width} bg="white">
      <InputLeftElement pointerEvents="none" height={height}>
        <IoIosSearch size={"24px"} className="text-[--primary-500]" />
      </InputLeftElement>
      <Input
        type="text"
        placeholder={placeholder}
        fontSize="14px"
        height={height}
        value={search || ""}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </InputGroup>
  );
}
