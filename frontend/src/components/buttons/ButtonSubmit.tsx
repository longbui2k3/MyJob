import { Button } from "@chakra-ui/react";
import { FiArrowRight } from "react-icons/fi";

interface ButtonSubmitProps {
  label: string;
  isLoading?: boolean;
  className?: string;
  height?: string;
  width?: string;
  fontSize?: string;
  onClick?: (e) => void;
}

export default function ButtonSubmit({
  label,
  isLoading = false,
  className,
  height = "44px",
  width = "100%",
  fontSize = "14px",
  onClick = () => {},
}: ButtonSubmitProps) {
  return (
    <Button
      type="submit"
      className={`w-full rounded-[8px] bg-primary-500 text-white ${className}`}
      width={width}
      height={height}
      fontSize={fontSize}
      bg="--primary-500"
      color="--white"
      _hover={{ bg: "var(--primary-500)", color: "white" }}
      rightIcon={<FiArrowRight className="text-[18px]" />}
      isLoading={isLoading}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
