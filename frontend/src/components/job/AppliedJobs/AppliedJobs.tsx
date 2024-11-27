import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Heading5 } from "../../headings";
import { ButtonSolid_2 } from "../../buttons";
import AppliedJobInfo from "./AppliedJobInfo";
import { useEffect, useState } from "react";
import { FindAppliedJobByUser } from "../../../apis";
import { changeDateToString } from "../../../utils";
import { Text } from "../../text";
import { GiBackwardTime } from "react-icons/gi";
import { FaRegCircleXmark } from "react-icons/fa6";
import { IoMdCheckmark } from "react-icons/io";
import { Pagination, usePagination } from "../../global";
import { useNavigate } from "react-router-dom";

interface StatusesProps {
  status?: string;
}
function Statuses({ status = "submitted" }: StatusesProps) {
  const statuses: { [key: string]: JSX.Element } = {
    submitted: (
      <div className="flex items-center space-x-1 text-[--submitted]">
        <GiBackwardTime size={20} />
        <Text className="mt-[0px] text-[var(--submitted)]">Submitted</Text>
      </div>
    ),
    rejected: (
      <div className="flex items-center space-x-1 text-[--rejected]">
        <FaRegCircleXmark size={20} />
        <Text className="mt-[0px] text-[var(--rejected)]">Rejected</Text>
      </div>
    ),
    accepted: (
      <div className="flex items-center space-x-1 text-[--accepted]">
        <IoMdCheckmark size={20} />
        <Text className="mt-[0px] text-[var(--accepted)]">Accepted</Text>
      </div>
    ),
  };
  return statuses[status];
}

interface AppliedJobsProps {
  isPagination?: boolean;
  isHeader?: boolean;
  limit?: number;
}

export default function AppliedJobs({
  isPagination = true,
  isHeader = true,
  limit,
}: AppliedJobsProps) {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Array<any>>([]);
  const { curPage, setCurPage } = usePagination();
  const [size, setSize] = useState(1);
  const [length, setLength] = useState(0);
  async function findAppliedJobs() {
    const data = await FindAppliedJobByUser({
      page: curPage,
      limit: limit || 10,
    });
    if (data.isSuccess) {
      setApplications(data.metadata.applications);
      setSize(data.metadata.meta.size);
      setLength(data.metadata.meta.length);
    }
  }
  useEffect(() => {
    findAppliedJobs();
  }, [curPage]);
  return (
    <>
      {isHeader ? (
        <div className="flex space-x-2 mb-3">
          <Heading5 name="Applied Jobs"></Heading5>
          <div className="font-normal text-xl text-gray-500">{`(${length})`}</div>
        </div>
      ) : (
        ""
      )}
      <div>
        <TableContainer>
          <Table variant="simple">
            <Thead color={"var(--gray-500)"}>
              <Tr>
                <Th>JOBS</Th>
                <Th>DATE APPLIED</Th>
                <Th>STATUS</Th>
                <Th>ACTION</Th>
              </Tr>
            </Thead>
            <Tbody>
              {applications.map((application: any) => (
                <Tr>
                  <Td>
                    <AppliedJobInfo
                      logo={application.job.company.logo}
                      jobTitle={application.job.jobTitle}
                      jobType={application.job.jobType}
                      mapLocation={application.job.company.mapLocation}
                      minSalary={application.job.minSalary}
                      maxSalary={application.job.maxSalary}
                    />
                  </Td>
                  <Td>
                    <Text className="mt-[0px]">
                      {changeDateToString(application.appliedAt)}
                    </Text>
                  </Td>
                  <Td>
                    <Text className="mt-[0px]">
                      <Statuses status={application.status} />
                    </Text>
                  </Td>
                  <Td>
                    <ButtonSolid_2
                      children={"View Details"}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/jobs/${application.job._id}`);
                      }}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        {isPagination ? (
          <Pagination curPage={curPage} setCurPage={setCurPage} size={size} />
        ) : (
          ""
        )}
      </div>
    </>
  );
}
