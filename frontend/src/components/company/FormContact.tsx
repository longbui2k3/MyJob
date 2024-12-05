import { GoMail } from "react-icons/go";
import BaseInput from "../inputs/Input/BaseInput";
import provinces from "../../data/provinces.json";
import { BaseSelect } from "../select";

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
          label="Map Location"
          options={locations.map((location) => location.label)}
          value={mapLocation}
          onChange={handleMapLocationChange}
          width="180px"
        />
        <div className="w-full">
          <BaseInput
            label="Address"
            type="text"
            value={address}
            onChange={handleAddressChange}
           />
        </div>
      </div>
      <div>
        <BaseInput
          label="Phone"
          type="text"
          placeholder="Phone number..."
          value={phone}
          onChange={handlePhoneChange}
        />
      </div>

      <div>
        <BaseInput
          LeftIcon={GoMail}
          label="Email"
          type="text"
          placeholder="Email address"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
    </div>
  );
}
