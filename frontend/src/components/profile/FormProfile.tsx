import { useEffect, useState } from "react";
import BaseInput from "../inputs/Input/BaseInput";
import useInput from "../inputs/Input/useInput";
import { GenderSelect, useGenderSelect } from "../select/GenderSelect";
import {
  MaritalStatusSelect,
  useMaritalStatusSelect,
} from "../select/MaritalStatusSelect";
import ProvinceSelect from "../select/ProvinceSelect/ProvinceSelect";
import useProvinceCodeSelect from "../select/ProvinceSelect/useProvinceSelect";
import { RichTextEditer } from "../inputs/RichTextEditer";
import { ButtonSolid } from "../buttons";
import { FindProfileAPI, UpdateProfileAPI } from "../../apis";
import { toastError, toastSuccess } from "../toast";

export default function FormProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const { provinceCode, setProvinceCode } = useProvinceCodeSelect();
  const {
    input: dateOfBirth,
    handleInput: handleDateOfBirthChange,
    setInput: setDateOfBirth,
  } = useInput({ defaultValue: "" });

  const { gender, setGender } = useGenderSelect();
  const { maritalStatus, setMaritalStatus } = useMaritalStatusSelect();
  const [biography, setBiography] = useState();

  const findProfile = async () => {
    const data = await FindProfileAPI();
    if (data.isSuccess) {
      setProvinceCode(data.metadata.profile.provinceCode);
      setDateOfBirth(data.metadata.profile.dateOfBirth.split("T")[0]);
      setGender(data.metadata.profile.gender);
      setMaritalStatus(data.metadata.profile.maritalStatus);
      setBiography(data.metadata.profile.biography);
    }
  };

  const updateProfile = async () => {
    setIsLoading(true);
    console.log({
      provinceCode: provinceCode,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
      gender,
      maritalStatus,
      biography,
    });
    const data = await UpdateProfileAPI({
      provinceCode: provinceCode,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
      gender,
      maritalStatus,
      biography,
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

  useEffect(() => {
    findProfile();
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <ProvinceSelect
          provinceCode={provinceCode}
          handleProvinceCodeChange={setProvinceCode}
        />
        <div>
          <BaseInput
            label="Date of birth"
            type="date"
            value={dateOfBirth}
            onChange={handleDateOfBirthChange}
          />
        </div>
        <GenderSelect gender={gender} handleGenderChange={setGender} />
        <MaritalStatusSelect
          maritalStatus={maritalStatus}
          handleMaritalStatusChange={setMaritalStatus}
        />
        <div className="col-span-2">
          <RichTextEditer
            label="Biography"
            value={biography}
            onChange={setBiography}
            placeholder="Biography"
          />
        </div>
      </div>
      <ButtonSolid
        children={"Save Changes"}
        className="mt-4"
        isLoading={isLoading}
        onClick={handleSubmit}
      />
    </>
  );
}
