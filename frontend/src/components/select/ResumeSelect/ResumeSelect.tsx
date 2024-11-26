import { Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FindResumesAPI } from "../../../apis";
import { useAuthContext } from "../../../context";
import { MessageError } from "../../global";
interface ResumeSelectProps {
  width?: string;
  className?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  isEmpty?: boolean;
}

export default function ResumeSelect({
  width,
  className,
  label,
  placeholder = "Select...",
  onChange,
  value,
  isEmpty = false,
}: ResumeSelectProps) {
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
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  useEffect(() => {
    findResumes();
  }, [userId]);
  return (
    <div className={`${className}`}>
      {label ? <div className="font-normal text-sm mb-2">{label}</div> : ""}
      <Select
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        width={width}
      >
        {resumes.map((resume) => (
          <option key={resume._id} value={resume._id}>
            {resume.name}
          </option>
        ))}
      </Select>
      {isEmpty ? <MessageError content={"Please select a resume!"} /> : ""}
    </div>
  );
}
