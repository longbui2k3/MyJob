import { Button } from "@chakra-ui/react";
import { FaYoutube } from "react-icons/fa";

interface ButtonYoutubeProps {
  link?: string;
}

export default function ButtonYoutube({ link = "" }: ButtonYoutubeProps) {
  return (
    <Button
      bg="white"
      leftIcon={<FaYoutube />}
      border={"1px solid var(--youtube)"}
      _hover={{
        bg: "white",
      }}
      color={"var(--youtube)"}
      width={"100px"}
      fontSize={12}
      borderRadius={"0px"}
      onClick={() => {
        window.open(link, "_blank")?.focus();
      }}
    >
      Youtube
    </Button>
  );
}
