import { Button } from "@chakra-ui/react";

interface ButtonOutlineProps {
  children?: string | JSX.Element;
  className?: string;
  border?: string;
}

export default function ButtonOutline({
  children,
  className,
  border = "1px",
}: ButtonOutlineProps) {
  return (
    <Button
      bg="white"
      border={border}
      textColor={"var(--primary-500)"}
      fontSize={"14px"}
      className={className}
      _hover={{ bg: "var(--primary-500)", color: "white" }}
    >
      {children}
    </Button>
  );
}
