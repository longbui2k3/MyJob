import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./style.css";

interface RichTextEditerProps {
  label?: string;
  value?: string;
  onChange?: (e) => void;
  placeholder?: string;
}

export default function RichTextEditer({
  label,
  value,
  onChange,
  placeholder,
}: RichTextEditerProps) {
  return (
    <>
      {label ? <div className="font-normal text-sm mb-2">{label}</div> : ""}
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </>
  );
}
