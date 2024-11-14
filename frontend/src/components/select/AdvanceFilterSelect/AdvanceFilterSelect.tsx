import { Button, Menu, MenuButton } from "@chakra-ui/react";
import { useState } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";

interface AdvanceFilterSelectProps {
  width?: string;
  height?: string;
  className?: string;
  onClick?: () => void;
}

export default function AdvanceFilterSelect({
  width,
  height,
  className = "",
  onClick = () => {},
}: AdvanceFilterSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Menu>
      <MenuButton
        isActive={isOpen}
        as={Button}
        width={width}
        height={height}
        className={`${className}`}
        color={isOpen ? "var(--primary-500)" : "var(--gray-200)"}
        fontSize="14px"
        rightIcon={
          isOpen ? (
            <GoChevronDown size={"20px"} />
          ) : (
            <GoChevronUp size={"20px"} />
          )
        }
        bg="white"
        textAlign={"left"}
        fontWeight={isOpen ? "semibold" : "normal"}
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
          onClick();
        }}
      >
        {"Advance Filter"}
      </MenuButton>
    </Menu>
  );
}
