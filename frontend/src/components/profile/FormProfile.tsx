import { useState } from "react";
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

export default function FormProfile() {
  const { provinceCode, setProvinceCode } = useProvinceCodeSelect();
  const { input: dateOfBirth, handleInput: handleDateOfBirthChange } = useInput(
    { defaultValue: "" }
  );

  const { gender, handleGenderChange } = useGenderSelect();
  const { maritalStatus, handleMaritalStatusChange } = useMaritalStatusSelect();
  const [biography, setBiography] = useState();
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <ProvinceSelect
          provinceCode={provinceCode}
          handleProvinceCodeChange={setProvinceCode}
        />
        <div>
          <BaseInput
            label="Year of Establishment"
            type="date"
            value={dateOfBirth}
            onChange={handleDateOfBirthChange}
          />
        </div>
        <GenderSelect gender={gender} handleGenderChange={handleGenderChange} />
        <MaritalStatusSelect
          maritalStatus={maritalStatus}
          handleMaritalStatusChange={handleMaritalStatusChange}
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
      <ButtonSolid children={"Save Changes"} className="mt-4" />
    </>
  );
}
