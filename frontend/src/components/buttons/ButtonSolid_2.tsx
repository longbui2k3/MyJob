import { Button } from "@chakra-ui/react";

interface ButtonSolid_2Props {
  children?: string | JSX.Element;
  className?: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  onClick?: (e) => void;
  width?: string;
  height?: string;
}

export default function ButtonSolid_2({
  children,
  className,
  leftIcon,
  rightIcon,
  onClick,
  width,
  height,
}: ButtonSolid_2Props) {
  return (
    <Button
      bg="var(--primary-50)"
      textColor={"var(--primary-500)"}
      fontSize={"14px"}
      className={className}
      _hover={{ bg: "var(--primary-500)", color: "white" }}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      onClick={onClick}
      width={width}
      height={height}
    >
      {children}
    </Button>
  );
}
