import { GoMail } from "react-icons/go";
import BaseInput from "../inputs/Input/BaseInput";
import { Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";

export default function FormContact() {
  return (
    <div>
      <div>
        <Text className="font-normal text-sm mb-2">Map Location</Text>
        <BaseInput />
      </div>
      <div>
        <Text className="font-normal text-sm mb-2">Phone</Text>
        <BaseInput placeholder="Phone number..." />
      </div>
      <div>
        <Text className="font-normal text-sm mb-2">Email</Text>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <GoMail size={22} color="var(--primary-500)" />
          </InputLeftElement>
          <Input type="url" placeholder="Website url..." />
        </InputGroup>
      </div>
    </div>
  );
}
