import { Button } from "@chakra-ui/react";
import { FaTwitter } from "react-icons/fa";

interface ButtonTwitterProps {
  link?: string;
}

export default function ButtonTwitter({ link = "" }: ButtonTwitterProps) {
  return (
    <Button
      bg="white"
      leftIcon={<FaTwitter />}
      border={"1px solid var(--twitter)"}
      _hover={{
        bg: "white",
      }}
      color={"var(--twitter)"}
      width={"100px"}
      fontSize={12}
      borderRadius={"0px"}
      onClick={() => {
        window.open(link, "_blank")?.focus();
      }}
    >
      Twitter
    </Button>
  );
}
