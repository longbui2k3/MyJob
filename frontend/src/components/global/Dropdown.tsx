import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

interface DropdownProps {
  Button?: JSX.Element | string;
  items: Array<{
    item: string;
    onClick: (e) => void;
  }>;
}

export default function Dropdown({ Button, items }: DropdownProps) {
  return (
    <Menu>
      <MenuButton>{Button}</MenuButton>
      <MenuList minWidth={"180px"}>
        {items.map((item) => (
          <MenuItem
            _focus={{
              bg: "var(--primary-50)",
              color: "var(--primary-500)",
            }}
            color={"var(--gray-500)"}
            onClick={item.onClick}
            _hover={{
              bg: "var(--primary-50)",
              color: "var(--primary-500)",
            }}
          >
            {item.item}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
