import { FaArrowRight } from "react-icons/fa";
import { ButtonOutline } from "../buttons";
import { Heading3 } from "../headings";
import { Text } from "../text";

export default function RegisterNow() {
  return (
    <div className="w-full px-[240px] py-[80px] flex space-x-4">
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
        />
      </div>
      <div className="w-[50%] p-8 bg-[--primary-600] rounded-lg">
        <Heading3 name="Become a Candidate" className="text-white" />
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
        />
      </div>
    </div>
  );
}
