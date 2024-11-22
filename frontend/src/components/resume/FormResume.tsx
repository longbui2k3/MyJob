import { useState } from "react";
import { closeFormResume } from "../../features";
import { ButtonSolid_2, ButtonSubmit } from "../buttons";
import { OutsideForm } from "../global";
import { UploadFileInput, useUploadFileInput } from "../inputs";
import { ResumeNameInput, useResumeNameInput } from "../inputs/ResumeNameInput";
import { useDispatch, useSelector } from "react-redux";
import { CreateResumeAPI } from "../../apis";

export default function FormResume() {
  const type = useSelector((state: any) => state.openForm.type);
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

  async function createResume() {
    setIsLoading(true);
    if (!inputResumeName || !file) return;
    const data = await CreateResumeAPI({
      name: inputResumeName,
      resumeFile: file,
    });

    if (data.isSuccess) {
      dispatch(closeFormResume());
    }
    setIsLoading(false);
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (type === "create") {
      await createResume();
    }
  };

  return (
    <OutsideForm
      onSubmit={handleSubmit}
      outsideHeight="100vh"
      closeForm={closeFormResume}
      header={type === "create" ? "Add CV/Resume" : "Update CV/Resume"}
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
          fileType="document"
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
