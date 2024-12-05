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
import { FindCompanyAPI, FindJobsAPI, UpdateJobAPI } from "../../../apis";
import { getRoute } from "../../../helpers/constants";
import { useNavigate } from "react-router-dom";
import {
  DASHBOARD_APPLICATIONS_KEY,
  DASHBOARD_EDIT_JOB_KEY,
} from "../../../helpers/constants/routes";
import { useCookies } from "react-cookie";
import NumberOfApplications from "./NumberOfApplications";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

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

export default function MyJobs({ isCheck = true, limit }: MyJobsProps) {
  const navigate = useNavigate();
  const { curPage, setCurPage } = usePagination();
  const [size, setSize] = useState(1);
  const [status, setStatus] = useState<string | undefined>();
  const [jobs, setJobs] = useState<Array<any>>([]);
  const [jobsNum, setJobsNum] = useState<number>(0);
  const [refresh, setRefresh] = useState<number>(0);
  const [cookie] = useCookies();

  async function findJobs() {
    const company = await FindCompanyAPI(cookie.user);
    if (company.isSuccess) {
      const data = await FindJobsAPI({
        company: company.metadata.company._id,
        limit: limit,
        page: curPage,
        status,
      });
      if (data.isSuccess) {
        setJobs(data.metadata.jobs);
        setSize(data.metadata.meta.size);
      }
      const jobsData = await FindJobsAPI({
        company: company.metadata.company._id,
      });
      if (jobsData.isSuccess) setJobsNum(jobsData.metadata.jobs.length);
    }
  }

  useEffect(() => {
    findJobs();
  }, [curPage, status, refresh]);

  const handleStatusChange = (value: string) => {
    if (value === "") setStatus(undefined);
    else setStatus(value);
  };
  return (
    <>
      {isCheck ? (
        <div className="flex justify-between mb-3">
          <div className="flex space-x-2">
            <Heading5 name="My Jobs"></Heading5>
            <div className="font-normal text-xl text-gray-500">({jobsNum})</div>
          </div>
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
                            onClick={async () => {
                              const response = await UpdateJobAPI(job._id, {
                                expirationDate: new Date().toISOString(),
                              });
                              if (response.isSuccess) {
                                setRefresh((prev) => prev + 1);
                              }
                            }}
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
