import { MessageError } from "../../global";
import BaseInput from "../Input/BaseInput";

interface CategoryNameInputProps {
  label?: string;
  value: string | null;
  onChange: (e) => void;
  isEmptyCategoryName: boolean;
  className?: string;
}

export default function CategoryNameInput({
  value,
  onChange,
  isEmptyCategoryName,
  className = "",
}: CategoryNameInputProps) {
  return (
    <div className="relative w-full">
      <BaseInput
        label="Category Name"
        type="text"
        placeholder="Category Name"
        value={value}
        onChange={onChange}
        className={`${className}`}
      />
      {isEmptyCategoryName ? (
        <MessageError content="Please enter your category name." />
      ) : (
        ""
      )}
    </div>
  );
}
