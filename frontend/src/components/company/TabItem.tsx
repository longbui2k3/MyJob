import { Button } from "@chakra-ui/react";
import React from "react";

interface TabItemProps {
  icon: JSX.Element;
  title: string;
  activeColor?: string;
}
export default function TabItem({ icon, title, activeColor }: TabItemProps) {
  return (
    <Button
      className=""
      paddingX={"20px"}
      textColor={activeColor}
      height={"36px"}
      leftIcon={React.cloneElement(icon, { strokeColor: activeColor })}
      bg="white"
      fontSize={"14px"}
      fontWeight={"500"}
      _hover={{ bg: "white" }}
    >
      {title}
    </Button>
  );
}
