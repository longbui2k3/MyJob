import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GoChevronDown, GoChevronUp, GoOrganization } from "react-icons/go";
import { OrganizationTypes } from "../../../helpers/constants";
interface OrganizationTypeSelectProps {
  width?: string;
  height?: string;
  className?: string;
  organizationType?: number;
  setOrganizationType?: React.Dispatch<React.SetStateAction<number>>;
  onClick?: (e) => void;
}
export default function OrganizationTypeSelect({
  width = "200px",
  height = "",
  className = "",
  organizationType = -1,
  setOrganizationType = () => {},
  onClick = (e) => {},
}: OrganizationTypeSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [optionName, setOptionName] = useState("Select organization type");
  const organizationTypes = OrganizationTypes.map((organizationType, i) => {
    return {
      label: organizationType,
      value: i,
    };
  });
  useEffect(() => {
    setOptionName(
      OrganizationTypes.find((__, i) => i === organizationType) ||
        "Select organization type"
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
          <GoOrganization size={"24px"} className="text-[--primary-500]" />
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
          height: "285px",
          width: `calc(${width} - 20px)`,
          overflowY: "auto",
        }}
      >
        <MenuItem
          fontSize={"14px"}
          onClick={() => {
            setOptionName("Select organization type");
            setOrganizationType(-1);
          }}
        >
          {"Select organization type"}
        </MenuItem>
        {organizationTypes.map((organizationType) => (
          <MenuItem
            value={organizationType.value}
            fontSize={"14px"}
            onClick={() => {
              setIsOpen(!isOpen);
              setOptionName(organizationType.label);
              setOrganizationType(organizationType.value);
            }}
          >
            {organizationType.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
