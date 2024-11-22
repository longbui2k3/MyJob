import { BiLinkAlt } from "react-icons/bi";
import { UploadFileInput, useUploadFileInput } from "../inputs";
import BaseInput from "../inputs/Input/BaseInput";
import useInput from "../inputs/Input/useInput";
import { EducationSelect, useEducationSelect } from "../select/EducationSelect";
import {
  ExperienceSelect,
  useExperienceSelect,
} from "../select/ExperienceSelect";
import { ButtonSolid } from "../buttons";
import { CreateResume, ResumeInfo } from "../resume";

export default function FormPersonal() {
  const { fileUrl: avatar, handleFileChange: handleAvatarChange } =
    useUploadFileInput();
  const { handleInput: handleFullNameChange, input: fullName } = useInput({
    defaultValue: "",
  });
  const { handleInput: handleTitleChange, input: title } = useInput({
    defaultValue: "",
  });
  const { experience, handleExperienceChange } = useExperienceSelect();

  const { education, handleEducationChange } = useEducationSelect();
  const { handleInput: handlePersonalWebsiteChange, input: personalWebsite } =
    useInput({
      defaultValue: "",
    });
  return (
    <>
      <div className="flex flex-col text-gray-900 space-y-4">
        <div className="font-medium text-lg leading-7">Basic Information</div>
        <div className="flex space-x-6 h-[370px] ">
          <UploadFileInput
            label="Profile Picture"
            note="A photo larger than 400 pixels work best. Max photo size 5 MB."
            className="w-60"
            fileUrl={avatar}
            onFileChange={handleAvatarChange}
          />
          <div className="grid grid-cols-2 gap-x-4 flex-grow">
            <div>
              <BaseInput
                label="Full name"
                type="text"
                value={fullName}
                onChange={handleFullNameChange}
              />
            </div>
            <div>
              <BaseInput
                label="Title/headline"
                type="text"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
            <div>
              <ExperienceSelect
                experience={experience}
                handleExperienceChange={handleExperienceChange}
              />
            </div>
            <div>
              <EducationSelect
                education={education}
                handleEducationChange={handleEducationChange}
              />
            </div>
            <div className="col-span-2">
              <BaseInput
                label="Personal website"
                type="text"
                value={personalWebsite}
                onChange={handlePersonalWebsiteChange}
                LeftIcon={BiLinkAlt}
              />
            </div>
            <ButtonSolid children={"Save Changes"} />
          </div>
        </div>
      </div>
      <div className="flex flex-col text-gray-900 space-y-4">
        <div className="font-medium text-lg leading-7">Your CV/Resume</div>
        <div className="grid grid-cols-2 gap-4">
          {new Array(5).fill(0).map((v) => (
            <ResumeInfo title="Long" />
          ))}
          <CreateResume />
        </div>
      </div>
    </>
  );
}
