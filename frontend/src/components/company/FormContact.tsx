import { GoMail } from "react-icons/go";
import BaseInput from "../inputs/Input/BaseInput";
import { Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function FormContact() {
  const [mapLocation, setMapLocation] = useState<string>("");
  const handleInputMapChange = (e) => {
    setMapLocation(e.target.value);
  };
  const [phone, setPhone] = useState<string>("");
  const handleInputPhoneChange = (e) => {
    setPhone(e.target.value);
  };
  return (
    <div>
      <div>
        <Text className="font-normal text-sm mb-2">Map Location</Text>
        <BaseInput
          type="text"
          value={mapLocation}
          onChange={handleInputMapChange}
        />
      </div>
      <div>
        <Text className="font-normal text-sm mb-2">Phone</Text>
        <BaseInput
          type="text"
          placeholder="Phone number..."
          value={phone}
          onChange={handleInputPhoneChange}
        />
      </div>
      <div>
        <Text className="font-normal text-sm mb-2">Email</Text>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <GoMail size={22} color="var(--primary-500)" />
          </InputLeftElement>
          <Input type="url" placeholder="Email address" />
        </InputGroup>
      </div>
    </div>
  );
}
