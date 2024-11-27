import { useDispatch, useSelector } from "react-redux";
import { formatFileSize } from "../../utils";
import UploadedResumeInfo from "./UploadedResumeInfo";
import { DeleteResumeAPI, FindResumesAPI } from "../../apis";
import { toastError, toastSuccess } from "../toast";
import { useEffect, useState } from "react";
import { openFormResume, setDataChange, setId, setType } from "../../features";
import { useAuthContext } from "../../context";
import CreateResume from "./CreateResume";

export default function UploadedResumeList() {
  const dispatch = useDispatch();
  const isDataChange = useSelector(
    (state: any) => state.changeData.isDataChange
  );
  const { userId } = useAuthContext();
  const [resumes, setResumes] = useState<Array<any>>([]);

  const findResumes = async () => {
    const data = await FindResumesAPI({
      user: userId || undefined,
    });
    if (data.isSuccess) {
      setResumes(data.metadata.resumes);
    }
  };

  const deleteResume = async (id: string) => {
    const data = await DeleteResumeAPI(id);
    if (data.isSuccess) {
      toastSuccess(data.message);
      dispatch(setDataChange());
    } else {
      toastError(data.message);
    }
  };

  useEffect(() => {
    findResumes();
  }, [userId, isDataChange]);
  return (
    <div className="flex flex-col text-gray-900 space-y-4">
      <div className="font-medium text-lg leading-7">Uploaded CV/Resume</div>
      <div className="grid grid-cols-2 gap-4">
        {resumes.map((resume) => (
          <UploadedResumeInfo
            title={resume.name}
            file_url={resume.resume.fileUrl}
            file_size={formatFileSize(resume.resume.fileSize)}
            onDelete={() => {
              deleteResume(resume._id);
            }}
            onEdit={() => {
              dispatch(openFormResume());
              dispatch(setType("update"));
              dispatch(setId(resume._id));
            }}
          />
        ))}
        <CreateResume />
      </div>
    </div>
  );
}
