import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GoChevronDown, GoChevronUp, GoStack } from "react-icons/go";
import { useFindCategories } from "../../../hooks";
interface CategorySelectProps {
  width?: string;
  height?: string;
  className?: string;
  category?: string;
  setCategory?: React.Dispatch<React.SetStateAction<string>>;
  onClick?: (e) => void;
}

export default function CategorySelect({
  width = "",
  height = "",
  className = "",
  category = "",
  setCategory = () => {},
  onClick = (e) => {},
}: CategorySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [optionName, setOptionName] = useState("Select Category");
  const { categories } = useFindCategories();

  useEffect(() => {
    setOptionName(
      categories.find((cate: any) => cate._id === category)?.name ||
        "Select Category"
    );
  }, [categories]);
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
        onClick={(e) => {
          setIsOpen(!isOpen);
          onClick(e);
        }}
      >
        {optionName}
      </MenuButton>
      <MenuList>
        <MenuItem
          fontSize={"14px"}
          onClick={() => {
            setOptionName("Select Category");
            setCategory("");
          }}
        >
          {"Select Category"}
        </MenuItem>
        {categories.map((category) => (
          <MenuItem
            value={category.name}
            fontSize={"14px"}
            onClick={() => {
              setIsOpen(!isOpen);
              setOptionName(category.name);
              setCategory(category._id);
            }}
          >
            {category.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
