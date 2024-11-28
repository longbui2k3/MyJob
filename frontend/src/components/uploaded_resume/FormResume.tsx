import { useEffect, useState } from "react";
import { closeFormResume, setDataChange } from "../../features";
import { ButtonSolid_2, ButtonSubmit } from "../buttons";
import { OutsideForm } from "../global";
import { UploadFileInput, useUploadFileInput } from "../inputs";
import { ResumeNameInput, useResumeNameInput } from "../inputs/ResumeNameInput";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateResumeAPI,
  FindResumeByIdAPI,
  UpdateResumeAPI,
} from "../../apis";
import { toastError, toastSuccess } from "../toast";

export default function FormResume() {
  const type = useSelector((state: any) => state.openForm.type);
  const id = useSelector((state: any) => state.openForm.id);
  const dispatch = useDispatch();
  const {
    inputResumeName,
    setInputResumeName,
    handleInputResumeName,
    isEmptyResumeName,
  } = useResumeNameInput({ defaultValue: "" });
  const [isLoading, setIsLoading] = useState(false);
  const {
    file,
    handleFileChange: handleResumeFileChange,
    fileUrl: resumeUrl,
    setFileUrl: setResumeUrl,
    isFileEmpty,
  } = useUploadFileInput();

  async function createResume() {
    if (!inputResumeName || !file) return;
    setIsLoading(true);
    const data = await CreateResumeAPI({
      name: inputResumeName,
      resumeFile: file,
    });

    if (data.isSuccess) {
      toastSuccess(data.message);
      dispatch(closeFormResume());
      dispatch(setDataChange());
    } else {
      toastError(data.message);
    }
    setIsLoading(false);
  }

  async function updateResume(id: string) {
    setIsLoading(true);
    const data = await UpdateResumeAPI(id, {
      name: inputResumeName,
      resumeFile: file,
    });

    if (data.isSuccess) {
      toastSuccess(data.message);
      dispatch(closeFormResume());
      dispatch(setDataChange());
    } else {
      toastError(data.message);
    }
    setIsLoading(false);
  }

  async function findResumeById(id: string) {
    const data = await FindResumeByIdAPI(id);
    if (data.isSuccess) {
      setInputResumeName(data.metadata.resume.name);
      setResumeUrl(data.metadata.resume.resume.fileUrl);
    }
  }

  useEffect(() => {
    if (type === "update") {
      findResumeById(id);
    }
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (type === "create") {
      await createResume();
    } else if (type === "update") {
      await updateResume(id);
    }
  };

  return (
    <OutsideForm
      onSubmit={handleSubmit}
      outsideHeight="100vh"
      closeForm={closeFormResume}
      header={type === "create" ? "Add CV/Resume" : "Update CV/Resume"}
      height="560px"
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
          isFileEmpty={isFileEmpty}
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
