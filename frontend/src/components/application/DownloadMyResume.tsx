import { IoDocumentTextOutline } from "react-icons/io5";
import { Heading, Heading6 } from "../headings";
import { Text } from "../text";
import { ButtonSolid_2 } from "../buttons";
import { BsDownload } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { openCVViewer, setData } from "../../features";

export default function DownloadMyResume({ resume }: { resume: any }) {
  const dispatch = useDispatch();
  function formatFileSize(bytes) {
    if (bytes < 1024) return `${bytes} Bytes`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    if (bytes < 1024 * 1024 * 1024)
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }

  return (
    <div className="border-2 border-[--gray-100] rounded-md w-full p-5">
      <Heading size={18} name="Download Resume" />
      <div className="mt-6 flex justify-between items-center h-[50px]">
        <div className="flex items-center">
          <IoDocumentTextOutline size={30} color={"var(--primary-500)"} />
          <div className="flex flex-col space-y-1 justify-between ml-[10px]">
            <div>
              <div
                onClick={() => {
                  dispatch(setData(resume?.resume?.fileUrl));
                  dispatch(openCVViewer());
                }}
              >
                <Heading6
                  name={resume?.resume?.fileName}
                  className="hover:text-[--primary-500] hover:underline cursor-pointer"
                />
              </div>
            </div>
            <Text className="mt-[0px]">
              {formatFileSize(resume?.resume.fileSize)}
            </Text>
          </div>
        </div>
        <ButtonSolid_2 children={<BsDownload size={20} />} />
      </div>
    </div>
  );
}
