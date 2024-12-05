import { useDispatch } from "react-redux";
import { openFormApplicationDetail, setId } from "../../features";
import { Avatar, ListItem, Tag, UnorderedList } from "@chakra-ui/react";
import { Heading6 } from "../headings";
import { ButtonOutline } from "../buttons";
import { GoDownload } from "react-icons/go";
import { FindResumeByIdAPI } from "../../apis";
import { BaseSelect } from "../select";
import { ApplicationStatuses } from "../../helpers/constants";

interface ApplicationsProps {
  applications?: Array<any>;
  onStatusChange: (
    id: string,
    newstatus: string,
    currentStatus: string
  ) => void;
}
export default function Applications({
  applications,
  onStatusChange,
}: ApplicationsProps) {
  const dispatch = useDispatch();

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const handleDownloadCv = async (resume: string) => {
    const data = await FindResumeByIdAPI(resume);
    if (data.isSuccess) {
      const link = document.createElement("a");
      link.href = data.metadata.resume.resume.fileUrl;
      document.body.appendChild(link);
      link.click();
    }
  };
  return (
    <div className="grid grid-cols-3 gap-4 ">
      {applications?.map((application) => (
        <>
          <div className="border-2 text-gray-500 p-3 space-y-3 rounded-md">
            <div
              onClick={() => {
                dispatch(openFormApplicationDetail());
                dispatch(setId(application._id));
              }}
              className="flex gap-3 items-center"
            >
              <Avatar
                height={"40px"}
                width={"40px"}
                src={application.profile.avatar}
              />
              <div>
                <div className="flex space-x-3 items-center">
                  <Heading6 name={application.profile.fullName} />
                  <Tag
                    bg="white"
                    border={`1px solid var(--${application?.status.toLowerCase()})`}
                    textColor={`var(--${application?.status.toLowerCase()})`}
                    fontSize={"13px"}
                    paddingX={"8px"}
                    marginY="auto"
                  >
                    {application.status}
                  </Tag>
                </div>
                <p className="text-sm">{application.profile.title}</p>
              </div>
            </div>
            <div className="border-b-2" />
            <UnorderedList fontSize={"14px"}>
              <ListItem>Experience: {application.profile.experience}</ListItem>
              <ListItem>Education: {application.profile.education}</ListItem>
              <ListItem>Applied: {formatDate(application.appliedAt)}</ListItem>
            </UnorderedList>
            <div className="flex justify-between">
              <ButtonOutline
                leftIcon={<GoDownload size={18} />}
                children={"Download Cv"}
                onClick={() => handleDownloadCv(application.resume)}
              />
              <BaseSelect
                placeholder="Status Change"
                options={ApplicationStatuses}
                onChange={(newStatus) =>
                  onStatusChange(application._id, newStatus, application.status)
                }
              />
            </div>
          </div>
        </>
      ))}
    </div>
  );
}
