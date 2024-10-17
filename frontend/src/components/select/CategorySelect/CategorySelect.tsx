import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useState } from "react";
import { GoChevronDown, GoChevronUp, GoStack } from "react-icons/go";

interface CategorySelectProps {
  width?: string;
  height?: string;
  className?: string;
}

const categories = [
  { category: "Graphics & Design" },
  { category: "Code & Programming" },
  { category: "Digital Marketing" },
  { category: "Video & Animation" },
  { category: "Music & Audio" },
  { category: "Account & Finance" },
  { category: "Health & Care" },
  { category: "Data & Science" },
];
export default function CategorySelect({
  width = "",
  height = "",
  className = "",
}: CategorySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [option, setOption] = useState("Select Category");
  return (
    <Menu>
      <MenuButton
        isActive={isOpen}
        as={Button}
        width={width}
        height={height}
        className={`${className}`}
        fontSize="14px"
        leftIcon={<GoStack size={"24px"} className="text-[--primary-500]" />}
        rightIcon={
          isOpen ? (
            <GoChevronDown size={"20px"} />
          ) : (
            <GoChevronUp size={"20px"} />
          )
        }
        bg="white"
        textAlign={"left"}
        fontWeight={"normal"}
        _hover={{
          bg: "white",
        }}
        _focus={{
          bg: "white",
        }}
        _active={{
          bg: "white",
        }}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {option}
      </MenuButton>
      <MenuList>
        <MenuItem
          fontSize={"14px"}
          onClick={() => {
            setOption("Select Category");
          }}
        >
          {"Select Category"}
        </MenuItem>
        {categories.map((category) => (
          <MenuItem
            value={category.category}
            fontSize={"14px"}
            onClick={() => {
              setIsOpen(!isOpen);
              setOption(category.category);
            }}
          >
            {category.category}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
