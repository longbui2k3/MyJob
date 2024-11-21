import { Button } from "@chakra-ui/react";

interface ButtonOutlineProps {
  children?: string | JSX.Element;
  className?: string;
  border?: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  onClick?: (e) => void;
  isHover?: boolean;
  bgColor?: string;
}

export default function ButtonOutline({
  children,
  className,
  border = "1px",
  leftIcon,
  rightIcon,
  onClick = (e) => {},
  isHover = true,
  bgColor = "white",
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
          : { bg: "transparent", color: "var(--primary-500)" }
      }
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      onClick={onClick}
      bgColor={bgColor}
    >
      {children}
    </Button>
  );
}
