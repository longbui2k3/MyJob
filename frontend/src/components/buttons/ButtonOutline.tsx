import { Button } from "@chakra-ui/react";

interface ButtonOutlineProps {
  children?: string | JSX.Element;
  className?: string;
  border?: string;
  leftIcon?: JSX.Element;
  onClick?: (e) => void;
  isHover?: boolean;
}

export default function ButtonOutline({
  children,
  className,
  border = "1px",
  leftIcon,
  onClick = (e) => {},
  isHover = true,
}: ButtonOutlineProps) {
  return (
    <Button
      bg="white"
      border={border}
      textColor={"var(--primary-500)"}
      fontSize={"14px"}
      className={className}
      _hover={
        isHover
          ? { bg: "var(--primary-500)", color: "white" }
          : { bg: "white", color: "var(--primary-500)" }
      }
      leftIcon={leftIcon}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
