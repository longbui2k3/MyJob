import { GoMail } from "react-icons/go";
import BaseInput from "../inputs/Input/BaseInput";
import { Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";

interface FormContactProps {
  mapLocation: string;
  phone: string;
  onMapLocationChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onEmailChange: (value: string) => void;
}

export default function FormContact({
  mapLocation,
  phone,
  onMapLocationChange,
  onPhoneChange,
  onEmailChange,
}: FormContactProps) {
  const handleMapLocationChange = (e) => {
    onMapLocationChange(e.target.value);
  };
  const handlePhoneChange = (e) => {
    onPhoneChange(e.target.value);
  };
  const handleEmailChange = (e) => {
    onEmailChange(e.target.value);
  };
  return (
    <div>
      <div>
        <Text className="font-normal text-sm mb-2">Map Location</Text>
        <BaseInput
          type="text"
          value={mapLocation}
          onChange={handleMapLocationChange}
        />
      </div>
      <div>
        <Text className="font-normal text-sm mb-2">Phone</Text>
        <BaseInput
          type="text"
          placeholder="Phone number..."
          value={phone}
          onChange={handlePhoneChange}
        />
      </div>
      <div>
        <Text className="font-normal text-sm mb-2">Email</Text>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <GoMail size={22} color="var(--primary-500)" />
          </InputLeftElement>
          <Input
            type="url"
            placeholder="Email address"
            onChange={handleEmailChange}
          />
        </InputGroup>
      </div>
    </div>
  );
}
