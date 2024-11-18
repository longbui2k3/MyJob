import { Heading5 } from "../../headings";
import { RichTextEditer } from "../../inputs/RichTextEditer";

interface DescriptionResponsibilityProps {
  jobDescription: string;
  jobResponsibilities: string;
  onJobDescriptionChange: (value: string) => void;
  onJobResponsibilitiesChange: (value: string) => void;
}

export default function DescriptionResponsibility({
  jobDescription,
  jobResponsibilities,
  onJobDescriptionChange,
  onJobResponsibilitiesChange,
}: DescriptionResponsibilityProps) {
  const handleJobDescriptionChange = (value: string) => {
    onJobDescriptionChange(value);
  };
  const handleJobResponsibilitiesChange = (value: string) => {
    onJobResponsibilitiesChange(value);
  };
  return (
    <>
      <Heading5 name="Description & Responsibility" />
      <div>
        <RichTextEditer
          label="Description"
          value={jobDescription}
          onChange={handleJobDescriptionChange}
        />
        <div className="h-4" />
        <RichTextEditer
          label="Responsibilities"
          value={jobResponsibilities}
          onChange={handleJobResponsibilitiesChange}
        />
      </div>
    </>
  );
}
