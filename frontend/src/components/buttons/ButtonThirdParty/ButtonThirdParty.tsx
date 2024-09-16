import { Button } from "@chakra-ui/react";

interface ButtonThirdPartyProps {
  leftIcon: JSX.Element;
  label: string;
}

export default function ButtonThirdParty({
  leftIcon,
  label,
}: ButtonThirdPartyProps) {
  return (
    <Button
      className="w-full border  border-[#e4e5e8] text-sm"
      height={"44px"}
      leftIcon={leftIcon}
      bg="white"
      fontSize={"14px"}
      _hover={{ bg: "white" }}
    >
      {label}
    </Button>
  );
}
