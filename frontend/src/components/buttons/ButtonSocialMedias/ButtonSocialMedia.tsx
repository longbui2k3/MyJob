import ButtonFacebook from "./ButtonFacebook";
import ButtonInstagram from "./ButtonInstagram";
import ButtonTwitter from "./ButtonTwitter";
import ButtonYoutube from "./ButtonYoutube";

interface ButtonSocialMediaProps {
  type?: string;
  link?: string;
}

export default function ButtonSocialMedia({
  type = "Facebook",
  link = "",
}: ButtonSocialMediaProps) {
  if (type === "Facebook") {
    return <ButtonFacebook link={link} />;
  }
  if (type === "Instagram") {
    return <ButtonInstagram link={link} />;
  }
  if (type === "Twitter") {
    return <ButtonTwitter link={link} />;
  }
  if (type === "Youtube") {
    return <ButtonYoutube link={link} />;
  }
}
