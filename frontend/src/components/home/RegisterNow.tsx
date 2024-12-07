import { FaArrowRight } from "react-icons/fa";
import { ButtonOutline } from "../buttons";
import { Heading3 } from "../headings";
import { Text } from "../text";
import {
  DEFAULT_PADDING_X,
  getRoute,
  SIGN_IN_KEY,
} from "../../helpers/constants";
import { useNavigate } from "react-router-dom";

export default function RegisterNow() {
  const navigate = useNavigate();
  return (
    <div
      className={`w-full flex space-x-4`}
      style={{
        padding: `80px ${DEFAULT_PADDING_X}`,
      }}
    >
      <div className="w-[50%] p-8 bg-[--gray-100] rounded-lg">
        <Heading3 name="Become a Candidate" />
        <Text className="w-[250px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras cursus a
          dolor convallis efficitur.
        </Text>
        <ButtonOutline
          children={
            <div className="flex space-x-2">
              <div>Register Now</div>
              <FaArrowRight className="my-auto" />
            </div>
          }
          className="mt-4"
          border="0px"
          onClick={() => {
            navigate(getRoute(SIGN_IN_KEY).path);
          }}
        />
      </div>
      <div className="w-[50%] p-8 bg-[--primary-600] rounded-lg">
        <Heading3 name="Become a Employer" className="text-white" />
        <Text className="text-white w-[250px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras cursus a
          dolor convallis efficitur.
        </Text>
        <ButtonOutline
          children={
            <div className="flex space-x-2">
              <div>Register Now</div>
              <FaArrowRight className="my-auto" />
            </div>
          }
          className="mt-4"
          border="0px"
          onClick={() => {
            navigate(getRoute(SIGN_IN_KEY).path);
          }}
        />
      </div>
    </div>
  );
}
