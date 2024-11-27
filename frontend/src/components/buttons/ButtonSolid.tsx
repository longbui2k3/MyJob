import { Button } from "@chakra-ui/react";

interface ButtonSolidProps {
  children?: string | JSX.Element;
  className?: string;
  leftIcon?: JSX.Element;
  onClick?: (e) => void;
  isLoading?: boolean;
  width?: string;
  height?: string;
}

export default function ButtonSolid({
  children,
  className,
  leftIcon,
  onClick = (e) => {},
  isLoading = false,
  width,
  height,
}: ButtonSolidProps) {
  return (
    <Button
      bg="var(--primary-500)"
      textColor={"white"}
      fontSize={"14px"}
      className={className}
      _hover={{ bg: "var(--primary-500)", color: "white" }}
      leftIcon={leftIcon}
      onClick={onClick}
      isLoading={isLoading}
      width={width}
      height={height}
    >
      {children}
    </Button>
  );
}
