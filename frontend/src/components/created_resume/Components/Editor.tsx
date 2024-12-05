import React, { useEffect, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CustomToolbar } from "../CustomToolbar";
interface EditorProps {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  hasToolbar?: boolean;
  readonly?: boolean;
  height?: string;
  isSingleLine?: boolean;
  style?: object;
}

export default React.forwardRef(
  (
    {
      value = "",
      placeholder = "",
      onChange = () => {},
      hasToolbar = false,
      readonly = false,
      height,
      isSingleLine = false,
      style,
    }: EditorProps,
    ref: any
  ) => {
    const [isHasToolbar, setIsHasToolbar] = useState(false);
    value = (value as any)?.replaceAll(" ", "\u00a0");
    if (isSingleLine) value = (value as any)?.replaceAll("<br>", "");
    useEffect(() => {
      if (
        !ref ||
        !ref.current ||
        !ref.current.editor ||
        !ref.current.editor.container ||
        !ref.current.editor.container.previousSibling
      )
        return;
      if (!isHasToolbar) {
        ref.current.editor.container.previousSibling.style.display = "none";
        ref.current.editor.container.style.border = "1px solid #ccc";
      } else
        ref.current.editor.container.previousSibling.style.display = "block";
    }, [isHasToolbar]);

    useEffect(() => {
      if (
        !ref ||
        !ref.current ||
        !ref.current.editor ||
        !ref.current.editor.container ||
        !ref.current.editor.container.parentElement
      )
        return;
      function handleClickOutside(event: any) {
        if (
          !ref.current.editor.container.parentElement.contains(event.target)
        ) {
          setIsHasToolbar(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
    return (
      <>
        <ReactQuill
          theme="snow"
          key={placeholder}
          ref={ref}
          placeholder={placeholder}
          value={value}
          modules={{
            toolbar: hasToolbar,
          }}
          onChange={onChange}
          readOnly={readonly}
          style={{
            ...(isSingleLine ? { height: "fit-content" } : { height }),
            ...style,
          }}
          onFocus={() => {
            setIsHasToolbar(true);
          }}
        />
      </>
    );
  }
);
