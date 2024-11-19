import { Button } from "@chakra-ui/react";
import InstagramIcon from "../../icons/InstagramIcon";

interface ButtonInstagramProps {
  link?: string;
}

export default function ButtonInstagram({ link = "" }: ButtonInstagramProps) {
  return (
    <div>
      <Button
        bg="white"
        leftIcon={<InstagramIcon className="w-[12px] h-[12px]" />}
        _hover={{
          bg: "white",
        }}
        width={"100px"}
        fontSize={12}
        style={{
          borderRadius: "0px",
          border: "1px solid transparent",
          borderImage: "var(--instagram)",
          borderImageSlice: "1",
          backgroundImage: "var(--instagram)",
          backgroundOrigin: "border-box",
          backgroundClip: "text",
          color: "transparent",
        }}
        onClick={() => {
          window.open(link, "_blank")?.focus();
        }}
      >
        Instagram
      </Button>
    </div>
  );
}
