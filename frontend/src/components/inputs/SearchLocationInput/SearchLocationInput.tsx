import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SlLocationPin } from "react-icons/sl";

interface SearchLocationInputProps {
  width?: string;
  height?: string;
}

export default function SearchLocationInput({
  width = "180px",
  height = "50px"
}: SearchLocationInputProps) {
  return (
    <InputGroup width={width} bg="white">
      <InputLeftElement pointerEvents="none" height={height}>
        <SlLocationPin size={"24px"} className="text-[--primary-500]" />
      </InputLeftElement>
      <Input
        type="text"
        placeholder="Your Location"
        fontSize="14px"
        height={height}
      />
    </InputGroup>
  );
}
