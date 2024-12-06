import { GoMail } from "react-icons/go";
import BaseInput from "../inputs/Input/BaseInput";
import provinces from "../../data/provinces.json";
import { BaseSelect } from "../select";
import { ButtonSolid } from "../buttons";
import { useEffect, useState } from "react";
import { toastError, toastSuccess } from "../toast";
import { FindProfileByUserAPI, UpdateProfileAPI } from "../../apis";
import { useDispatch } from "react-redux";
import { setDataChange } from "../../features";

// interface FormContactProps {
//   mapLocation?: string;
//   address?: string;
//   phone?: string;
//   email?: string;
//   onMapLocationChange?: (value: string) => void;
//   onProvinceCodeChange?: (value: number) => void;
//   onAddressChange?: (value: string) => void;
//   onPhoneChange?: (value: string) => void;
//   onEmailChange?: (value: string) => void;
// }

export default function FormContact() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const locations = provinces.map((province) => {
    return {
      label: province.english_name,
      value: province.code,
    };
  });

  // map location
  const [mapLocation, setMapLocation] = useState<string>("");
  // provinceCode
  const [provinceCode, setProvinceCode] = useState<number>(0);

  const handleMapLocationChange = (mapLocation: string) => {
    setMapLocation(mapLocation);
    locations.map((location) => {
      if (location.label === mapLocation) {
        setProvinceCode(location.value);
      }
    });
  };

  // address
  const [address, setAddress] = useState<string>("");
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  // phone
  const [mobile, setMobile] = useState<string>("");
  const handleMobileChange = (e) => {
    setMobile(e.target.value);
  };

  const findProfile = async () => {
    const data = await FindProfileByUserAPI();
    if (data.isSuccess) {
      setMapLocation(data.metadata.profile.mapLocation);
      setAddress(data.metadata.profile.address);
      setMobile(data.metadata.profile.mobile);
    }
  };
  useEffect(() => {
    dispatch(setDataChange());
  }, []);

  useEffect(() => {
    findProfile();
  }, []);

  const updateProfile = async () => {
    setIsLoading(true);
    const data = await UpdateProfileAPI({
      mapLocation,
      provinceCode,
      address,
      mobile,
    });
    if (data.isSuccess) {
      toastSuccess(data.message);
    } else {
      toastError(data.message);
    }
    setIsLoading(false);
  };

  async function handleSubmit() {
    await updateProfile();
  }
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
            required={false}
          />
        </div>
      </div>
      <div>
        <BaseInput
          label="Phone"
          type="text"
          placeholder="Phone number..."
          value={mobile}
          onChange={handleMobileChange}
        />
      </div>

      <div>
        <BaseInput
          LeftIcon={GoMail}
          label="Email"
          type="text"
          placeholder="Email address"
          value={"buiduclong911@gmail.com"}
        />
      </div>
      <ButtonSolid
        children={"Save Changes"}
        className="mt-4"
        isLoading={isLoading}
        onClick={handleSubmit}
      />
    </div>
  );
}
