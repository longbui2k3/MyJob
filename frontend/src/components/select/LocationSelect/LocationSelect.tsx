import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import provinces from "../../../data/provinces.json";
import { useEffect, useState } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { SlLocationPin } from "react-icons/sl";
interface LocationSelectProps {
  width?: string;
  height?: string;
  className?: string;
  provinceCode?: number;
  setProvinceCode?: React.Dispatch<React.SetStateAction<number>>;
  onClick?: (e) => void;
}
export default function LocationSelect({
  width = "200px",
  height = "",
  className = "",
  provinceCode = 0,
  setProvinceCode = () => {},
  onClick = (e) => {},
}: LocationSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [optionName, setOptionName] = useState("Select Location");
  const locations = provinces.map((province) => {
    return {
      label: province.english_name,
      value: province.code,
    };
  });
  useEffect(() => {
    setOptionName(
      provinces.find((province) => province.code === provinceCode)
        ?.english_name || "Select Location"
    );
  }, []);
  return (
    <Menu>
      <MenuButton
        isActive={isOpen}
        as={Button}
        width={width}
        height={height}
        className={`${className}`}
        fontSize="14px"
        leftIcon={
          <SlLocationPin size={"24px"} className="text-[--primary-500]" />
        }
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
      <MenuList
        style={{
          height: "360px",
          overflowY: "auto",
        }}
      >
        <MenuItem
          fontSize={"14px"}
          onClick={() => {
            setOptionName("Select Location");
            setProvinceCode(0);
          }}
        >
          {"Select Location"}
        </MenuItem>
        {locations.map((location) => (
          <MenuItem
            value={location.value}
            fontSize={"14px"}
            onClick={() => {
              setIsOpen(!isOpen);
              setOptionName(location.label);
              setProvinceCode(location.value);
            }}
          >
            {location.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
