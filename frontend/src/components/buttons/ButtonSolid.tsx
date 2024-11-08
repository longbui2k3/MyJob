import { Button } from "@chakra-ui/react";

interface ButtonSolidProps {
  children?: string | JSX.Element;
  className?: string;
  leftIcon?: JSX.Element;
  onClick?: (e) => void;
}

export default function ButtonSolid({
  children,
  className,
  leftIcon,
  onClick = (e) => {},
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
    >
      {children}
    </Button>
  );
}
