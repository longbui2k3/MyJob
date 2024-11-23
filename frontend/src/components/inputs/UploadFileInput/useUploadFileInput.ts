import { useState } from "react";

export default function useUploadFileInput() {
  const [file, setFile] = useState<File | null>();
  const [fileUrl, setFileUrl] = useState<string>("");
  const handleFileChange = (file: File | null) => setFile(file);
  const isFileEmpty = !file;
  return { file, handleFileChange, fileUrl, setFileUrl, isFileEmpty };
}
