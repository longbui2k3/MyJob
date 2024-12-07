import { useState } from "react";
import { closeCVViewer } from "../../features";
import OutsideForm from "./OutsideForm";
import { Document, Page, pdfjs } from "react-pdf";
interface CVViewerProps {
  fileUrl?: string;
}

export default function CVViewer({ fileUrl = "" }: CVViewerProps) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  async function handleSubmit() {}
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

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
      <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
        <Page
          pageNumber={pageNumber}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          //   customTextRenderer={false}
        />
      </Document>
    </OutsideForm>
  );
}
