import { useDispatch } from "react-redux";
import {
  openCVViewer,
  openFormApplicationDetail,
  setData,
  setId,
} from "../../features";
import {
  Avatar,
  IconButton,
  ListItem,
  Tag,
  Tooltip,
  UnorderedList,
} from "@chakra-ui/react";
import { Heading6 } from "../headings";
import { ButtonOutline } from "../buttons";
import { LuCalendarCheck } from "react-icons/lu";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import { CiCircleRemove } from "react-icons/ci";

interface ApplicationsProps {
  applications?: Array<any>;
  onStatusChange: (id: string, value: string) => void;
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
              className="flex gap-3 items-center cursor-pointer"
            >
              {application?.profile?.avatar ? (
                <Avatar
                  height={"40px"}
                  width={"40px"}
                  src={application?.profile?.avatar}
                />
              ) : (
                <FaUserCircle size="40px" color="var(--default-avatar)" />
              )}

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
                // leftIcon={<GoDownload size={18} />}
                children={"View CV"}
                onClick={() => {
                  dispatch(setData(application.resume.resume.fileUrl));
                  dispatch(openCVViewer());
                }}
              />
              {/* <BaseSelect
                placeholder="Status Change"
                options={ApplicationStatuses}
                onChange={(newStatus) =>
                  onStatusChange(application._id, newStatus, application.status)
                }
              /> */}

              <div className="space-x-2">
                <Tooltip label="Interview">
                  <IconButton
                    icon={<LuCalendarCheck size={20} color="white" />}
                    bg={"var(--interview)"}
                    aria-label="Interview"
                    onClick={() => onStatusChange(application._id, "Interview")}
                  />
                </Tooltip>
                <Tooltip label="Hire">
                  <IconButton
                    icon={<FaCheck size={17} color="white" />}
                    bg={"var(--hired)"}
                    aria-label="Hired"
                    onClick={() => onStatusChange(application._id, "Hired")}
                  />
                </Tooltip>
                <Tooltip label="Reject">
                  <IconButton
                    icon={<CiCircleRemove size={22} color="white" />}
                    bg={"var(--rejected)"}
                    aria-label="Rejected"
                    onClick={() => onStatusChange(application._id, "Rejected")}
                  />
                </Tooltip>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
}
