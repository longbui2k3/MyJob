import { useDispatch, useSelector } from "react-redux";
import { closeFormApplyJob } from "../../features";
import { OutsideForm } from "../global";
import { CreateApplicationAPI, FindJobAPI } from "../../apis";
import { useEffect, useState } from "react";
import { ResumeSelect, useResumeSelect } from "../select/ResumeSelect";
import { RichTextEditer } from "../inputs/RichTextEditer";
import useInput from "../inputs/Input/useInput";
import { ButtonSolid_2, ButtonSubmit } from "../buttons";
import { toastError, toastSuccess } from "../toast";

export default function FormApplyJob() {
  const [isLoading, setIsLoading] = useState(false);
  const id = useSelector((state: any) => state.openForm.id);
  const dispatch = useDispatch();
  const { resume, setResume, isEmptyResume } = useResumeSelect();
  const [job, setJob] = useState<any>({});
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

  useEffect(() => {
    findJob();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const data = await CreateApplicationAPI({
      job,
      resume,
      coverLetter,
    });
    if (data.isSuccess) {
      dispatch(closeFormApplyJob());
      toastSuccess(data.message);
    } else {
      toastError(data.message);
    }
    setIsLoading(false);
  }
  return (
    <OutsideForm
      closeForm={closeFormApplyJob}
      header={`Apply Job: ${job?.jobTitle || ""} `}
      onSubmit={handleSubmit}
      height="500px"
    >
      <>
        <ResumeSelect
          label="Choose Resume"
          value={resume}
          onChange={setResume}
          placeholder="Select Resume"
          isEmpty={isEmptyResume}
        />
        <RichTextEditer
          label={"Cover letter"}
          placeholder={
            "Write down your biography here. Let the employer know why you are the best candidate for the job."
          }
          value={coverLetter ? coverLetter : ""}
          onChange={setCoverLetter}
        />
        <div className="flex justify-between">
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
      </>
    </OutsideForm>
  );
}
