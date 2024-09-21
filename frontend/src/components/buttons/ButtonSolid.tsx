import { Button } from "@chakra-ui/react";

interface ButtonSolidProps {
  children?: string | JSX.Element;
  className?: string;
}

export default function ButtonSolid({ children, className }: ButtonSolidProps) {
  return (
    <Button
      bg="var(--primary-500)"
      textColor={"white"}
      fontSize={"14px"}
      className={className}
      _hover={{ bg: "var(--primary-500)", color: "white" }}
    >
      {children}
    </Button>
  );
}
