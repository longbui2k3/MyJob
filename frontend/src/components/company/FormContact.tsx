import { GoMail } from "react-icons/go";
import BaseInput from "../inputs/Input/BaseInput";
import { Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import BaseSelect from "./BaseSelect";
import provinces from "../../data/provinces.json";

interface FormContactProps {
  mapLocation: string;
  address: string;
  phone: string;
  email: string;
  onMapLocationChange: (value: string) => void;
  onProvinceCodeChange: (value: number) => void;
  onAddressChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onEmailChange: (value: string) => void;
}

export default function FormContact({
  mapLocation,
  address,
  phone,
  email,
  onMapLocationChange,
  onProvinceCodeChange,
  onAddressChange,
  onPhoneChange,
  onEmailChange,
}: FormContactProps) {
  const locations = provinces.map((province) => {
    return {
      label: province.english_name,
      value: province.code,
    };
  });
  const handleMapLocationChange = (mapLocation: string) => {
    onMapLocationChange(mapLocation);
    locations.map((location) => {
      if (location.label === mapLocation) {
        onProvinceCodeChange(location.value);
      }
    });
  };
  const handleAddressChange = (e) => {
    onAddressChange(e.target.value);
  };
  const handlePhoneChange = (e) => {
    onPhoneChange(e.target.value);
  };
  const handleEmailChange = (e) => {
    onEmailChange(e.target.value);
  };
  return (
    <div className="space-y-3 font-normal text-sm">
      <div className="flex flex-row space-x-3">
        <BaseSelect
          text="Map Location"
          options={locations.map((location) => location.label)}
          value={mapLocation}
          onChange={handleMapLocationChange}
        />
        <div className="w-full">
          <Text className="font-normal text-sm mb-2">Address</Text>
          <BaseInput
            type="text"
            value={address}
            onChange={handleAddressChange}
          />
        </div>
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
            value={email}
            onChange={handleEmailChange}
          />
        </InputGroup>
      </div>
    </div>
  );
}
