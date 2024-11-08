import { Button } from "@chakra-ui/react";

interface ButtonOutlineProps {
  children?: string | JSX.Element;
  className?: string;
  border?: string;
  leftIcon?: JSX.Element;
  onClick?: (e) => void;
}

export default function ButtonOutline({
  children,
  className,
  border = "1px",
  leftIcon,
  onClick = (e) => {},
}: ButtonOutlineProps) {
  return (
    <Button
      bg="white"
      border={border}
      textColor={"var(--primary-500)"}
      fontSize={"14px"}
      className={className}
      _hover={{ bg: "var(--primary-500)", color: "white" }}
      leftIcon={leftIcon}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
