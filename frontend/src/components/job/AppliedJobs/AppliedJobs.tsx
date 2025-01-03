import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Heading5, Heading6 } from "../../headings";
import AppliedJobInfo from "./AppliedJobInfo";
import { useEffect, useState } from "react";
import { FindAppliedJobByUser } from "../../../apis";
import { changeDateToString } from "../../../utils";
import { Text } from "../../text";
import { GiBackwardTime } from "react-icons/gi";
import { Pagination, usePagination } from "../../global";
import { useNavigate } from "react-router-dom";
import { CiCircleRemove } from "react-icons/ci";
import { EMPLOYER_DETAIL_KEY, getRoute } from "../../../helpers/constants";
import { LuCalendarCheck } from "react-icons/lu";
import { FaCheck } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { openCVViewer, setData } from "../../../features";

interface StatusesProps {
  status?: string;
}
function Statuses({ status = "Submitted" }: StatusesProps) {
  const statuses: { [key: string]: JSX.Element } = {
    Submitted: (
      <div className="flex items-center space-x-1 text-[--submitted]">
        <GiBackwardTime size={20} />
        <Text className="mt-[0px] text-[var(--submitted)]">Submitted</Text>
      </div>
    ),
    Interview: (
      <div className="flex items-center space-x-1 text-[--interview]">
        <LuCalendarCheck size={20} />
        <Text className="mt-[0px] text-[var(--interview)]">Interview</Text>
      </div>
    ),
    Hired: (
      <div className="flex items-center space-x-1 text-[--hired]">
        <FaCheck size={20} />
        <Text className="mt-[0px] text-[var(--hired)]">Hired</Text>
      </div>
    ),
    Rejected: (
      <div className="flex items-center space-x-1 text-[--rejected]">
        <CiCircleRemove size={20} />
        <Text className="mt-[0px] text-[var(--rejected)]">Rejected</Text>
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Array<any>>([]);
  const { curPage, setCurPage } = usePagination();
  const [size, setSize] = useState(1);
  const [length, setLength] = useState(0);
  async function findAppliedJobs() {
    const data = await FindAppliedJobByUser({
      page: curPage,
      limit: limit || 6,
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
                <Th w={"50%"}>JOB</Th>
                <Th w={"20%"}>COMPANY</Th>
                <Th w={"15%"}>DATE APPLIED</Th>
                <Th w={"15%"}>STATUS</Th>
              </Tr>
            </Thead>
            <Tbody>
              {applications.map((application: any) => (
                <Tr>
                  <Td>
                    <AppliedJobInfo
                      jobId={application.job._id}
                      logo={application.job.company.logo}
                      jobTitle={application.job.jobTitle}
                      jobType={application.job.jobType}
                      mapLocation={application.job.company.mapLocation}
                      minSalary={application.job.minSalary}
                      maxSalary={application.job.maxSalary}
                    />
                  </Td>
                  <Td>
                    <a
                      href={
                        getRoute(EMPLOYER_DETAIL_KEY, {
                          param: {
                            id: application.job.company._id,
                          },
                        }).path
                      }
                    >
                      <Heading6
                        name={application.job.company.companyName}
                        className="hover:text-[--primary-500] hover:underline"
                      />
                    </a>
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
                    <Button
                      leftIcon={
                        <AiOutlineEye size={16} color="var(--primary-500)" />
                      }
                      bg={"var(--primary-50)"}
                      onClick={() => {
                        dispatch(setData(application.resume.resume.fileUrl));
                        dispatch(openCVViewer());
                      }}
                      _hover={{
                        bg: "var(--primary-50)",
                      }}
                      padding={"0px 5px"}
                      fontSize={"11px"}
                      color="var(--primary-500)"
                      borderRadius={"10px"}
                      height={"30px"}
                    >
                      View CV
                    </Button>
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
