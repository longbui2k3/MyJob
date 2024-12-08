import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
} from "@chakra-ui/react";
import { Heading5 } from "../../headings";
import { BaseSelect } from "../../select";
import { ButtonSolid_2 } from "../../buttons";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdOutlineModeEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import { Pagination, usePagination } from "../../global";
import { CiCircleRemove } from "react-icons/ci";
import MyJobInfo from "./MyJobInfo";
import { FindJobsAPI, UpdateJobAPI } from "../../../apis";
import { getRoute } from "../../../helpers/constants";
import { useNavigate } from "react-router-dom";
import {
  DASHBOARD_APPLICATIONS_KEY,
  DASHBOARD_EDIT_JOB_KEY,
} from "../../../helpers/constants/routes";
import NumberOfApplications from "./NumberOfApplications";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { useSearchInput_1 } from "../../inputs";
import { SearchJobInput } from "../../inputs/SearchJobInput";
import { useAuthContext } from "../../../context";
import { toastError, toastSuccess } from "../../toast";

interface StatusesProps {
  status?: string;
}
function Statuses({ status = "Active" }: StatusesProps) {
  const statuses: { [key: string]: JSX.Element } = {
    Active: (
      <div className="flex items-center space-x-1 text-[--active]">
        <IoCheckmarkCircleOutline size={21} />
        <Text className="mt-[0px] text-[var(--active)]">Active</Text>
      </div>
    ),
    Expired: (
      <div className="flex items-center space-x-1 text-[--expired]">
        <CiCircleRemove size={20} />
        <Text className="mt-[0px] text-[var(--expired)]">Expired</Text>
      </div>
    ),
  };
  return statuses[status];
}

interface MyJobsProps {
  isCheck?: boolean;
  limit?: number;
}

export default function MyJobs({ isCheck = true, limit = 5 }: MyJobsProps) {
  const navigate = useNavigate();
  const { userId } = useAuthContext();
  const { curPage, setCurPage } = usePagination();
  const [size, setSize] = useState(1);
  const [status, setStatus] = useState<string | undefined>();
  const [jobs, setJobs] = useState<Array<any>>([]);
  const [jobsNum, setJobsNum] = useState<number>(0);
  const [refresh, setRefresh] = useState<number>(0);
  const { search, setSearch } = useSearchInput_1();

  async function findJobs() {
    const data = await FindJobsAPI({
      company: userId || undefined,
      limit: limit,
      page: curPage,
      status,
      search: search || undefined,
    });
    console.log("Check", userId);
    if (data.isSuccess) {
      setJobs(data.metadata.jobs);
      setSize(data.metadata.meta.size);
    }
    const jobsData = await FindJobsAPI({
      company: userId || undefined,
    });
    if (jobsData.isSuccess) setJobsNum(jobsData.metadata.jobs.length);
  }

  useEffect(() => {
    findJobs();
  }, [curPage, status, refresh, search]);

  const handleStatusChange = (value: string) => {
    if (value === "") setStatus(undefined);
    else setStatus(value);
  };
  const handleExpiredJob = async (id: string, status: string) => {
    const data = await UpdateJobAPI(id, { status });
    if (data.isSuccess) {
      toastSuccess(data.message);
      setRefresh((prev) => prev + 1);
    } else {
      toastError(data.message);
    }
  };
  return (
    <>
      {isCheck ? (
        <div className="space-y-5">
          <div className="flex space-x-2">
            <Heading5 name="My Jobs"></Heading5>
            <div className="font-normal text-xl text-gray-500">({jobsNum})</div>
          </div>
          <div className="flex justify-between">
            <SearchJobInput
              search={search}
              setSearch={setSearch}
              placeholder="Job title, keyword"
            />
            <BaseSelect
              label="Job status"
              options={["Active", "Expired"]}
              placeholder="All Jobs"
              className="flex space-x-3 items-center"
              width="120px"
              value={status}
              onChange={handleStatusChange}
              required={false}
            />
          </div>
        </div>
      ) : (
        ""
      )}

      <div>
        <TableContainer>
          <Table variant="simple">
            <Thead color={"var(--gray-500)"}>
              <Tr>
                <Th w={"40%"}>JOBS</Th>
                <Th w={"20%"}>STATUS</Th>
                <Th w={"20%"}>APPLICATIONS</Th>
                <Th w={"20%"}> ACTIONS</Th>
              </Tr>
            </Thead>
            <Tbody>
              {jobs.map((job) => (
                <Tr key={job._id}>
                  <Td>
                    <MyJobInfo
                      jobTitle={job.jobTitle}
                      jobType={job.jobType}
                      expirationDate={job.expirationDate}
                    />
                  </Td>
                  <Td>
                    <Statuses status={job.status} />
                    {/* <MyJobStatus status={job.status} /> */}
                  </Td>
                  <Td>
                    <NumberOfApplications job={job._id} />
                  </Td>
                  <Td>
                    <div className="space-x-1">
                      <ButtonSolid_2
                        children={"View Applications"}
                        onClick={() => {
                          navigate(
                            getRoute(DASHBOARD_APPLICATIONS_KEY).path.replace(
                              ":jobId",
                              job._id
                            ),
                            {
                              replace: true,
                            }
                          );
                        }}
                      />
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          aria-label="Options"
                          icon={<HiOutlineDotsVertical />}
                          variant="outline"
                        />
                        <MenuList>
                          <MenuItem
                            onClick={() => {
                              navigate(
                                getRoute(DASHBOARD_EDIT_JOB_KEY).path.replace(
                                  ":jobId",
                                  job._id
                                ),
                                {
                                  replace: true,
                                }
                              );
                            }}
                            icon={<MdOutlineModeEdit size={20} />}
                          >
                            Edit Job
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleExpiredJob(job._id, "Expired")}
                            icon={<CiCircleRemove size={20} />}
                          >
                            Make it Expire
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </div>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        {isCheck ? (
          <Pagination curPage={curPage} setCurPage={setCurPage} size={size} />
        ) : (
          ""
        )}
      </div>
    </>
  );
}
