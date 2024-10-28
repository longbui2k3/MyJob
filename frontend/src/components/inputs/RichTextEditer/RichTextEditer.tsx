import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./style.css";

interface RichTextEditerProps {
  value?: string;
  onChange?: (e) => void;
  placeholder?: string;
}

export default function RichTextEditer({
  value,
  onChange,
  placeholder,
}: RichTextEditerProps) {
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
