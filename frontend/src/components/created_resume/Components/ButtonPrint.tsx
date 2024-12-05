import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ButtonSolid } from "../../buttons";
import { IoMdDownload } from "react-icons/io";
import { mmToPx, pxToMm } from "../../../utils";
import { toastError } from "../../toast";

interface ButtonPrintProps {
  name?: string;
  id?: string;
  label?: string;
  onClick?: () => void;
}

const ButtonPrint = ({
  name,
  id,
  label,
  onClick = () => {},
}: ButtonPrintProps) => {
  const generatePDF = () => {
    const input = document.getElementById(id);
    if (!input) return;
    const inputHeightMm = pxToMm(input.offsetHeight);
    const a4WidthMm = 210;
    const a4HeightMm = 297;
    const a4HeightPx = mmToPx(a4HeightMm);
    const numPages =
      inputHeightMm <= a4HeightMm
        ? 1
        : Math.floor(inputHeightMm / a4HeightMm) + 1;

    html2canvas(input, { scrollY: 20 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpg", 1.0);
      // console.log(imgData);
      let pdf;
      // Document of a4WidthMm wide and inputHeightMm high
      if (inputHeightMm > a4HeightMm) {
        // elongated a4 (system print dialog will handle page breaks)
        //console.log("edited mode ");
        pdf = new jsPDF("p", "mm", [inputHeightMm + 16, a4WidthMm]);
      } else {
        // standard a4
        //  console.log("normal mode ");
        pdf = new jsPDF();
      }
      pdf.addImage(imgData, "JPG", 0, 0);
      pdf.save(`${name}.pdf`);
    });

    ////////////////////////////////////////////////////////
    // System to manually handle page breaks
    // Wasn't able to get it working !
    // The idea is to break html2canvas screenshots into multiple chunks and stich them together as a pdf
    // If you get this working, please email me a khuranashivek@outlook.com and I'll update the article
    ////////////////////////////////////////////////////////
    /* let pdf = new jsPDF();
    range(0, numPages).forEach(page => {
      console.log(
        `Rendering page ${page}. Capturing height: ${a4HeightPx} at yOffset: ${page *
          a4HeightPx}`
      );
      html2canvas(input, { height: a4HeightPx, y: page * a4HeightPx }).then(
        canvas => {
          const imgData = canvas.toDataURL("image/png");
          console.log(imgData);
          if (page > 0) {
            pdf.addPage();
          }
          pdf.addImage(imgData, "PNG", 0, 0);
        }
      );
    });

    setTimeout(() => {
      pdf.save(`${id}.pdf`);
    }, 5000);*/
  };
  return (
    <div>
      <div id="myMm" style={{ height: "1mm", position: "absolute" }} />

      <ButtonSolid
        leftIcon={<IoMdDownload size={16} />}
        onClick={() => {
          if (!name) {
            toastError("Please fill the CV name!");
            return;
          }
          onClick();
          generatePDF();
        }}
        height="40px"
      >
        {label}
      </ButtonSolid>
    </div>
  );
};

export default ButtonPrint;
