import { FacebookIcon } from "../../icons";
import ButtonThirdParty from "./ButtonThirdParty";

interface ButtonFacebookProps {
  type: string;
}

export default function ButtonFacebook({ type }: ButtonFacebookProps) {
  return (
    <ButtonThirdParty
      leftIcon={<FacebookIcon className="" />}
      label={`${type} with Facebook`}
    />
  );
}
