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
} from "@chakra-ui/react";
import { Heading5 } from "../../headings";
import { BaseSelect } from "../../select";
import JobInfo from "./JobInfo";
import JobStatus from "./JobStatus";
import { PiUsers } from "react-icons/pi";
import { ButtonSolid_2 } from "../../buttons";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdOutlineModeEdit } from "react-icons/md";
import { FindJobsByCompanyAPI } from "../../../apis/jobAPI";
import { useEffect, useState } from "react";
import { Pagination, usePagination } from "../../global";
import { CiCircleRemove } from "react-icons/ci";

export default function MyJobs() {
  const { curPage, setCurPage } = usePagination();
  const [size, setSize] = useState(1);
  const [status, setStatus] = useState<string | undefined>();
  const [jobs, setJobs] = useState<Array<any>>([]);
  const [jobsCount, setJobsCount] = useState<number>(0);

  async function findJobsbyCompany() {
    const data = await FindJobsByCompanyAPI({
      limit: jobsCount,
      page: curPage,
      status,
    });
    if (data.isSuccess) {
      setJobs(data.metadata.jobs);
      setSize(data.metadata.meta.size);
    }
    const jobsData = await FindJobsByCompanyAPI({});
    if (jobsData.isSuccess) setJobsCount(jobsData.metadata.jobs.length);
  }
  useEffect(() => {
    findJobsbyCompany();
  }, [curPage, status]);

  const handleStatusChange = (value: string) => {
    if (value === "") setStatus(undefined);
    else setStatus(value);
  };
  return (
    <>
      <div className="flex justify-between mb-3">
        <div className="flex space-x-2">
          <Heading5 name="My Jobs"></Heading5>
          <div className="font-normal text-xl text-gray-500">({jobsCount})</div>
        </div>
        <BaseSelect
          label="Job status"
          options={["Active", "Expired"]}
          className="flex space-x-3 items-center"
          width="120px"
          value={status}
          onChange={handleStatusChange}
        />
      </div>
      <div>
        <TableContainer>
          <Table variant="simple">
            <Thead color={"var(--gray-500)"}>
              <Tr>
                <Th>JOBS</Th>
                <Th>STATUS</Th>
                <Th>APPLICATIONS</Th>
                <Th>ACTIONS</Th>
              </Tr>
            </Thead>
            <Tbody>
              {jobs.map((job) => (
                <Tr key={job.id}>
                  <Td>
                    <JobInfo
                      jobTitle={job.jobTitle}
                      jobType={job.jobType}
                      expirationDate={job.expirationDate}
                    />
                  </Td>
                  <Td>
                    <JobStatus status={job.status} />
                  </Td>
                  <Td>
                    <div className="flex space-x-1 text-sm">
                      <PiUsers size={22} />
                      <div>798 Applications</div>
                    </div>
                  </Td>
                  <Td>
                    <div className="space-x-1">
                      <ButtonSolid_2 children={"View Applications"} />
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          aria-label="Options"
                          icon={<HiOutlineDotsVertical />}
                          variant="outline"
                        />
                        <MenuList>
                          <MenuItem icon={<MdOutlineModeEdit size={20} />}>
                            Edit Job
                          </MenuItem>
                          <MenuItem icon={<CiCircleRemove size={20} />}>
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

        <Pagination curPage={curPage} setCurPage={setCurPage} size={size} />
      </div>
    </>
  );
}
