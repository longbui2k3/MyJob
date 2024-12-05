import Editor from "./Editor";
import { useRef } from "react";

interface EditorPropertyProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  fontSizeLabel?: string;
}

export default function EditorProperty({
  label,
  placeholder,
  value = "",
  onChange = () => {},
  fontSizeLabel = "16px",
}: EditorPropertyProps) {
  const divRef = useRef<any>();
  return (
    <div className="flex flex-col gap-2">
      <div
        className="font-[500]"
        style={{
          fontSize: fontSizeLabel,
        }}
      >
        {label || placeholder}
      </div>
      <Editor
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        hasToolbar={true}
        isSingleLine={true}
        ref={divRef}
      />
    </div>
  );
}
