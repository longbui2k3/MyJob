import { useEffect, useState } from "react";
import { FindResumesAPI } from "../../apis";
import CreateResume from "./CreateResume";
import { useAuthContext } from "../../context";
import CreatedResumeInfo from "./CreatedResumeInfo";

export default function CreatedResumeList() {
  const { userId } = useAuthContext();
  const [resumes, setResumes] = useState<Array<any>>([]);
  async function findCreatedResume() {
    const data = await FindResumesAPI({
      type: "created_resume",
      user: userId || undefined,
    });
    if (data.isSuccess) {
      setResumes(data.metadata.resumes);
    }
  }

  useEffect(() => {
    findCreatedResume();
  }, [userId]);

  return (
    <div className="flex flex-col text-gray-900 space-y-4">
      <div className="font-medium text-lg leading-7">Created CV/Resume</div>
      <div className="grid grid-cols-5 gap-4">
        <CreateResume />
        {resumes.map((resume) => (
          <CreatedResumeInfo name={resume.name} _id={resume._id} />
        ))}
      </div>
    </div>
  );
}
