import { GoogleIcon } from "../../icons";
import ButtonThirdParty from "./ButtonThirdParty";

interface ButtonGoogleProps {
  type: string;
}

export default function ButtonGoogle({ type }: ButtonGoogleProps) {
  return (
    <ButtonThirdParty
      leftIcon={<GoogleIcon className="" />}
      label={`${type} with Google`}
    />
  );
}
