import { useState } from "react";

export default function useUploadFileInput() {
  const [file, setFile] = useState<File>();
  const [fileUrl, setFileUrl] = useState<string>("");
  const handleFileChange = (file: File) => setFile(file);

  return { file, handleFileChange, fileUrl, setFileUrl };
}
