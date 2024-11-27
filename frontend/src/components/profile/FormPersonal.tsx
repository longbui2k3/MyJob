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
import { useEffect, useState } from "react";
import { FindProfileByUserAPI, UpdateProfileAPI } from "../../apis";
import { useDispatch } from "react-redux";
import { setDataChange } from "../../features";
import { toastError, toastSuccess } from "../toast";
import { UploadedResumeList } from "../resume";

export default function FormPersonal() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const {
    fileUrl: avatar,
    file: avatarFile,
    handleFileChange: handleAvatarChange,
    setFileUrl: setAvatar,
  } = useUploadFileInput();
  const {
    handleInput: handleFullNameChange,
    input: fullName,
    setInput: setFullName,
  } = useInput({
    defaultValue: "",
  });
  const {
    handleInput: handleTitleChange,
    input: title,
    setInput: setTitle,
  } = useInput({
    defaultValue: "",
  });
  const { experience, setExperience } = useExperienceSelect();

  const { education, setEducation } = useEducationSelect();
  const {
    handleInput: handlePersonalWebsiteChange,
    input: personalWebsite,
    setInput: setPersonalWebsite,
  } = useInput({
    defaultValue: "",
  });

  const findProfile = async () => {
    const data = await FindProfileByUserAPI();
    if (data.isSuccess) {
      setAvatar(data.metadata.profile.avatar);
      setFullName(data.metadata.profile.fullName);
      setTitle(data.metadata.profile.title);
      setExperience(data.metadata.profile.experience);
      setEducation(data.metadata.profile.education);
      setPersonalWebsite(data.metadata.profile.personalWebsite);
    }
  };

  const updateProfile = async () => {
    setIsLoading(true);
    const data = await UpdateProfileAPI({
      avatar: avatarFile,
      fullName,
      title,
      experience,
      education,
      personalWebsite,
    });
    if (data.isSuccess) {
      toastSuccess(data.message);
    } else {
      toastError(data.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    dispatch(setDataChange());
  }, []);

  useEffect(() => {
    findProfile();
  }, []);

  async function handleSubmit() {
    await updateProfile();
  }

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
                handleExperienceChange={setExperience}
              />
            </div>
            <div>
              <EducationSelect
                education={education}
                handleEducationChange={setEducation}
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
            <ButtonSolid
              children={"Save Changes"}
              isLoading={isLoading}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
      <UploadedResumeList />
    </>
  );
}
