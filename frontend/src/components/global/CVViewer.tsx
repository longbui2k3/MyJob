import { useState } from "react";
import { closeCVViewer } from "../../features";
import OutsideForm from "./OutsideForm";
import { Document, Page, pdfjs } from "react-pdf";
import { useSelector } from "react-redux";

export default function CVViewer() {
  const data = useSelector((state: any) => state.openForm.data);
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  async function handleSubmit() {}
  const [numPages, setNumPages] = useState<number>();

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }
  return (
    <OutsideForm
      closeForm={closeCVViewer}
      header={``}
      onSubmit={handleSubmit}
      width="700px"
      height="1200px"
    >
      <Document file={data} onLoadSuccess={onDocumentLoadSuccess}>
        {new Array(numPages)
          .fill(0)
          .map((x, i) => i + 1)
          .map((page) => (
            <Page
              pageNumber={page}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          ))}
      </Document>
    </OutsideForm>
  );
}
