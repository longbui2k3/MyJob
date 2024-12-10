import { useDispatch, useSelector } from "react-redux";
import { closeFormApplyJob, setDataChange } from "../../features";
import { OutsideForm } from "../global";
import { CreateApplicationAPI, CreateResumeAPI, FindJobAPI } from "../../apis";
import { useEffect, useState } from "react";
import { ResumeSelect, useResumeSelect } from "../select/ResumeSelect";
import { RichTextEditer } from "../inputs/RichTextEditer";
import useInput from "../inputs/Input/useInput";
import { ButtonSolid_2, ButtonSubmit } from "../buttons";
import { toastError, toastSuccess } from "../toast";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import {
  ResumeNameInput,
  UploadFileInput,
  useResumeNameInput,
  useUploadFileInput,
} from "../inputs";

export default function FormApplyJob() {
  const [isLoading, setIsLoading] = useState(false);
  const id = useSelector((state: any) => state.openForm.id);
  const dispatch = useDispatch();
  const { resume, setResume, isEmptyResume } = useResumeSelect();
  const [job, setJob] = useState<any>({});
  const [radioValue, setRadioValue] = useState<any>("1");
  async function findJob() {
    if (!id) return;
    const data = await FindJobAPI(id);
    if (data.isSuccess) {
      setJob(data.metadata.job);
    }
  }
  const { input: coverLetter, setInput: setCoverLetter } = useInput({
    defaultValue: "",
  });
  const {
    inputResumeName,
    setInputResumeName,
    handleInputResumeName,
    isEmptyResumeName,
  } = useResumeNameInput({ defaultValue: "" });
  const {
    file,
    handleFileChange: handleResumeFileChange,
    fileUrl: resumeUrl,
    setFileUrl: setResumeUrl,
    isFileEmpty,
  } = useUploadFileInput();
  useEffect(() => {
    findJob();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (radioValue === "1") {
      if (!resume) return;
      setIsLoading(true);
      const data = await CreateApplicationAPI({
        job,
        resume,
        coverLetter,
      });
      if (data.isSuccess) {
        toastSuccess(data.message);
        dispatch(closeFormApplyJob());
        dispatch(setDataChange());
      } else {
        toastError(data.message);
      }
      setIsLoading(false);
    } else if (radioValue === "2") {
      if (!inputResumeName || !file) return;
      setIsLoading(true);
      const dataResume = await CreateResumeAPI({
        name: inputResumeName,
        resumeFile: file,
      });

      const data = await CreateApplicationAPI({
        job,
        resume: dataResume.metadata.resume._id.toString(),
        coverLetter,
      });

      if (data.isSuccess) {
        toastSuccess(data.message);
        dispatch(closeFormApplyJob());
        dispatch(setDataChange());
      } else {
        toastError(data.message);
      }
      setIsLoading(false);
    }
  }
  return (
    <OutsideForm
      closeForm={closeFormApplyJob}
      header={`Apply Job: ${job?.jobTitle || ""} `}
      onSubmit={handleSubmit}
      height="fit-content"
    >
      <div className="flex flex-col gap-5 justify-between">
        <div className="flex flex-col gap-5">
          <RadioGroup
            defaultValue="1"
            onChange={(value) => {
              setRadioValue(value);
            }}
          >
            <Stack spacing={5} direction="column">
              <Stack spacing={5} direction="row">
                <Radio value="1"></Radio>
                <div className="flex flex-col gap-2 border-[1px] border-[--gray-100] w-[410px] p-[15px]">
                  <ResumeSelect
                    label="Choose Resume"
                    value={resume}
                    onChange={setResume}
                    placeholder="Select Resume"
                    isEmpty={radioValue === "1" && isEmptyResume}
                    width="full"
                  />
                </div>
              </Stack>
              <Stack spacing={5} direction="row">
                <Radio value="2"></Radio>
                <div className="flex flex-col gap-2 border-[1px] border-[--gray-100] w-[410px] p-[15px]">
                  <ResumeNameInput
                    value={inputResumeName}
                    onChange={handleInputResumeName}
                    isEmptyResumeName={radioValue === "2" && isEmptyResumeName}
                  />
                  <UploadFileInput
                    label="Upload your CV/Resume"
                    note="Only PDF format available. Max file size 12 MB."
                    className="w-[100%] h-[200px]"
                    fileUrl={resumeUrl}
                    onFileChange={handleResumeFileChange}
                    fileType="document"
                    isFileEmpty={radioValue === "2" && isFileEmpty}
                  />
                </div>
              </Stack>
            </Stack>
          </RadioGroup>
          <div>
            <RichTextEditer
              label={"Cover letter"}
              placeholder={
                "Write down your biography here. Let the employer know why you are the best candidate for the job."
              }
              value={coverLetter ? coverLetter : ""}
              onChange={setCoverLetter}
            />
          </div>
        </div>
        <div className="flex justify-between mb-[30px]">
          <ButtonSolid_2
            width="160px"
            height="40px"
            onClick={() => {
              dispatch(closeFormApplyJob());
            }}
          >
            Cancel
          </ButtonSolid_2>
          <ButtonSubmit
            label="Apply Now"
            isLoading={isLoading}
            width="160px"
            height="40px"
          />
        </div>
      </div>
    </OutsideForm>
  );
}
