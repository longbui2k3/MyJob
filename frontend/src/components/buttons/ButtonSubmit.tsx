import { Button } from "@chakra-ui/react";
import { FiArrowRight } from "react-icons/fi";

interface ButtonSubmitProps {
  label: string;
  isLoading: boolean;
}

export default function ButtonSubmit({ label, isLoading }: ButtonSubmitProps) {
  return (
    <Button
      type="submit"
      className="h-[40px] mt-[25px] w-full rounded-[8px] bg-primary-500 text-white"
      height={"44px"}
      fontSize={"14px"}
      bg="--primary-500"
      color="--white"
      _hover={{ bg: "var(--primary-500)", color: "--white" }}
      rightIcon={<FiArrowRight className="text-[18px]" />}
      isLoading={isLoading}
    >
      {label}
    </Button>
  );
}
