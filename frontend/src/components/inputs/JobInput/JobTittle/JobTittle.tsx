import { Text } from "@chakra-ui/react";
import { MessageError } from "../../../global";
import BaseInput from "../../Input/BaseInput";

interface JobTittleProps {
  value?: string;
  onChange: (e) => void;
  isEmptyJobTittle: boolean;
  className?: string;
}

export default function JobTittle({
  value,
  onChange,
  isEmptyJobTittle,
  className = "",
}: JobTittleProps) {
  return (
    <div className="relative w-full">
      <Text className="font-normal text-sm mb-2">Job Tittle</Text>
      <BaseInput
        type="text"
        value={value}
        placeholder="Add job tittle, role, vacancies etc"
        onChange={onChange}
        className={`${className}`}
      />
      {isEmptyJobTittle ? (
        <MessageError content="Please enter job tittle." />
      ) : (
        ""
      )}
    </div>
  );
}
