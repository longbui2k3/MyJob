import { useEffect, useState } from "react";
import { Pagination, usePagination } from "../global";
import {
  FindApplicationsAPI,
  FindResumeByIdAPI,
  UpdateApplicationAPI,
} from "../../apis";
import { useParams } from "react-router-dom";
import { toastError, toastSuccess } from "../toast";
import { Heading5, Heading6 } from "../headings";
import {
  Avatar,
  IconButton,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  UnorderedList,
} from "@chakra-ui/react";
import { ButtonOutline } from "../buttons";
import { GoDownload } from "react-icons/go";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { CiCircleRemove } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { openFormApplicationDetail, setId } from "../../features";

export default function ApplicationList() {
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const [applications, setApplications] = useState<Array<any>>([]);
  const [status, setStatus] = useState<string | undefined>();
  const { curPage, setCurPage } = usePagination();
  const [size, setSize] = useState(1);

  async function findApplications() {
    const data = await FindApplicationsAPI({ job: jobId, status });
    if (data.isSuccess) {
      setApplications(data.metadata.applications);
      setSize(data.metadata.meta.size);
    }
  }
  useEffect(() => {
    findApplications();
  }, [status]);

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

  const handleApplicationStatus = async (id: string, status: string) => {
    const data = await UpdateApplicationAPI(id, { status });
    if (data.isSuccess) {
      toastSuccess("update status successfully!");
    } else {
      toastError("update status failed!");
    }
  };
  return (
    <>
      <Heading5 name="Job Applications" />
      <Tabs variant="enclosed" className="mt-4">
        <TabList mb="1em">
          <Tab>Submit</Tab>
          <Tab>Consider</Tab>
          <Tab>Interview</Tab>
          <Tab>Hire</Tab>
          <Tab>Reject</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>
              <div className="grid grid-cols-3 gap-4 ">
                {applications.map((application) => (
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
                          <Heading6 name={application.profile.fullName} />
                          <p className="text-sm">{application.profile.title}</p>
                        </div>
                      </div>
                      <div className="border-b-2" />
                      <UnorderedList fontSize={"14px"}>
                        <ListItem>
                          Experience: {application.profile.experience}
                        </ListItem>
                        <ListItem>
                          Education: {application.profile.education}
                        </ListItem>
                        <ListItem>
                          Applied: {formatDate(application.appliedAt)}
                        </ListItem>
                      </UnorderedList>
                      <div className="flex justify-between">
                        <ButtonOutline
                          leftIcon={<GoDownload size={18} />}
                          children={"Download Cv"}
                          onClick={() => handleDownloadCv(application.resume)}
                        />
                        <Menu>
                          <MenuButton
                            as={IconButton}
                            aria-label="Options"
                            icon={<HiOutlineDotsVertical />}
                            bg={"white"}
                          />
                          <MenuList>
                            <MenuItem
                              icon={
                                <IoCheckmarkCircleOutline
                                  color="green"
                                  size={20}
                                />
                              }
                              onClick={() =>
                                handleApplicationStatus(
                                  application._id,
                                  "accepted"
                                )
                              }
                            >
                              Accept
                            </MenuItem>
                            <MenuItem
                              icon={<CiCircleRemove color="red" size={20} />}
                              onClick={() =>
                                handleApplicationStatus(
                                  application._id,
                                  "rejected"
                                )
                              }
                            >
                              Reject
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </div>
                    </div>
                  </>
                ))}
              </div>
              <Pagination
                curPage={curPage}
                setCurPage={setCurPage}
                size={size}
              />
            </p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
