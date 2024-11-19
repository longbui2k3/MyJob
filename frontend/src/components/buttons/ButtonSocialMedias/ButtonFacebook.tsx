import { Button } from "@chakra-ui/react";
import { FaFacebookF } from "react-icons/fa";

interface ButtonFacebookProps {
  link?: string;
}

export default function ButtonFacebook({ link = "" }: ButtonFacebookProps) {
  return (
    <Button
      bg="white"
      leftIcon={<FaFacebookF />}
      border={"1px solid var(--facebook)"}
      _hover={{
        bg: "white",
      }}
      color={"var(--facebook)"}
      width={"100px"}
      fontSize={12}
      borderRadius={"0px"}
      onClick={() => {
        window.open(link, "_blank")?.focus();
      }}
    >
      Facebook
    </Button>
  );
}
