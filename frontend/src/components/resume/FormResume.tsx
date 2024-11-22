import { useState } from "react";
import { closeFormResume } from "../../features";
import { ButtonSolid_2, ButtonSubmit } from "../buttons";
import { OutsideForm } from "../global";
import { UploadFileInput, useUploadFileInput } from "../inputs";
import { ResumeNameInput, useResumeNameInput } from "../inputs/ResumeNameInput";
import { useDispatch } from "react-redux";

export default function FormResume() {
  const dispatch = useDispatch();
  const { inputResumeName, handleInputResumeName, isEmptyResumeName } =
    useResumeNameInput({ defaultValue: "" });
  const [isLoading, setIsLoading] = useState(false);
  const {
    file,
    handleFileChange: handleResumeFileChange,
    fileUrl: resumeUrl,
    setFileUrl,
  } = useUploadFileInput();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
  };

  return (
    <OutsideForm
      onSubmit={handleSubmit}
      outsideHeight="100vh"
      closeForm={closeFormResume}
      header="Add CV/Resume"
    >
      <>
        <ResumeNameInput
          value={inputResumeName}
          onChange={handleInputResumeName}
          isEmptyResumeName={isEmptyResumeName}
        />
        <UploadFileInput
          label="Upload your CV/Resume"
          note="Only PDF format available. Max file size 12 MB."
          className="w-[100%]"
          fileUrl={resumeUrl}
          onFileChange={handleResumeFileChange}
        />
        <div className="flex justify-between">
          <ButtonSolid_2
            width="160px"
            height="40px"
            onClick={() => {
              dispatch(closeFormResume());
            }}
          >
            Cancel
          </ButtonSolid_2>
          <ButtonSubmit
            label="Submit"
            isLoading={isLoading}
            width="160px"
            height="40px"
          />
        </div>
      </>
    </OutsideForm>
  );
}
