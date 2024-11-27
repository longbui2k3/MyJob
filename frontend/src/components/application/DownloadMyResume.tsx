import { IoDocumentTextOutline } from "react-icons/io5";
import { Heading, Heading6 } from "../headings";
import { Text } from "../text";
import { ButtonSolid_2 } from "../buttons";
import { BsDownload } from "react-icons/bs";

export default function DownloadMyResume({ resume }: { resume: any }) {
  return (
    <div className="border-[1px] border-[--gray-100] rounded-md w-full p-5">
      <Heading size={18} name="Download Resume" />
      <div className="mt-6 flex justify-between items-center h-[50px]">
        <div className="flex items-center">
          <IoDocumentTextOutline size={30} color={"var(--primary-500)"} />
          <div className="flex flex-col space-y-1 justify-between ml-[10px]">
            <a href={resume?.resume?.fileUrl}>
              <Heading6
                name={resume?.resume?.fileName}
                className="hover:text-[--primary-500] hover:underline cursor-pointer"
              />
            </a>
            <Text className="mt-[0px]">{resume?.resume?.fileSize}</Text>
          </div>
        </div>
        <ButtonSolid_2 children={<BsDownload size={20} />} />
      </div>
    </div>
  );
}
