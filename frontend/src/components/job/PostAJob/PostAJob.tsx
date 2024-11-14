import { JobTittle, useJobTittle } from "../../inputs/JobInput";

export default function PostAJob() {
  const [inputJobTittle, handleInputJobTittle, isEmptyJobTittle] = useJobTittle(
    {
      defaultValue: null,
    }
  );

  return (
    <div className="relative w-full">
      <JobTittle
        value={inputJobTittle}
        onChange={handleInputJobTittle}
        isEmptyJobTittle={isEmptyJobTittle}
      />
    </div>
  );
}
