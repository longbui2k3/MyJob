import { useEffect, useRef, useState } from "react";
import { AdvanceFilter, Pagination, usePagination } from "../global";
import { FindApplicationsAPI, UpdateApplicationAPI } from "../../apis";
import { useParams } from "react-router-dom";
import { Heading5 } from "../headings";
import {
  IconButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import Applications from "./Applications";
import { ApplicationStatuses } from "../../helpers/constants";
import { ButtonSolid } from "../buttons";
import { TfiEmail } from "react-icons/tfi";
import { MdOutlineSaveAs } from "react-icons/md";
import { AdvanceFilterSelect } from "../select/AdvanceFilterSelect";
import { useSearchInput_3 } from "../inputs";
import { useDispatch, useSelector } from "react-redux";
import { openFormSendEmail } from "../../features";
import { toastSuccess } from "../toast";

export default function ApplicationList() {
  const dispatch = useDispatch();
  const { jobId } = useParams();
  const [applications, setApplications] = useState<Array<any>>([]);
  const [status, setStatus] = useState<string | undefined>("Submitted");
  const [updatedStatuses, setUpdatedStatuses] = useState<
    Record<string, string>
  >({});
  const { curPage, setCurPage } = usePagination();
  const [size, setSize] = useState(1);
  const [applicationCounts, setApplicationCounts] = useState<
    Record<string, number>
  >({});
  const isDataChange = useSelector(
    (state: any) => state.changeData.isDataChange
  );
  const [isOpenAdvanceFilter, setIsOpenAdvanceFilter] = useState(false);
  const advanceFilterRef = useRef<HTMLDivElement | null>(null);
  const { experiences, setExperiences, educations, setEducations } =
    useSearchInput_3();

  useEffect(() => {
    if (advanceFilterRef.current) {
      const parentWidth =
        advanceFilterRef.current.parentElement?.getBoundingClientRect().width;
      if (parentWidth) {
        advanceFilterRef.current.style.width = `${parentWidth}px`;
      }
    }
  }, [isOpenAdvanceFilter]);

  async function findApplications() {
    const data = await FindApplicationsAPI({
      job: jobId,
      status,
      page: curPage,
    });
    if (data.isSuccess) {
      setApplications(data.metadata.applications);
      setSize(data.metadata.meta.size);
    }
  }
  useEffect(() => {
    findApplications();
  }, [status]);

  async function fetchApplicationCounts() {
    const counts: Record<string, number> = {};
    for (const value of ApplicationStatuses) {
      const data = await FindApplicationsAPI({ job: jobId, status: value });
      if (data.isSuccess) {
        counts[value] = data.metadata.applications.length;
      }
    }
    setApplicationCounts(counts);
  }
  useEffect(() => {
    fetchApplicationCounts();
  }, []);

  const handleTabChange = (index: number) => {
    setStatus(ApplicationStatuses[index]);
  };

  // update list application status
  const handleStatusChange = (
    id: string,
    newStatus: string,
    currentStatus: string
  ) => {
    if (newStatus !== "" && newStatus !== currentStatus) {
      setUpdatedStatuses((prevStatus) => ({
        ...prevStatus,
        [id]: newStatus,
      }));
    } else {
      setUpdatedStatuses((prevStatus) => {
        const { [id]: _, ...rest } = prevStatus;
        return rest;
      });
    }
  };
  const handleUpdateApplication = async () => {
    const promises = Object.entries(updatedStatuses).map(([id, status]) =>
      UpdateApplicationAPI(id, { status })
    );
    toastSuccess("Update application successfully!");
    await Promise.all(promises);

    findApplications();
    fetchApplicationCounts();
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading5 name="Job Applications" />
        <div className="flex space-x-2">
          {/* <div className="border-2 rounded-md">
            <AdvanceFilterSelect
              onClick={() => {
                setIsOpenAdvanceFilter(!isOpenAdvanceFilter);
              }}
            />
          </div> */}
          <ButtonSolid
            className="my-auto"
            onClick={() => {
              dispatch(openFormSendEmail());
            }}
            children={"Send Email"}
            leftIcon={<TfiEmail size={20} />}
            height="40px"
            width="150px"
          />
          <IconButton
            icon={<MdOutlineSaveAs size={22} color="white" />}
            bg={"var(--primary-500)"}
            aria-label="Save changes"
            onClick={() => handleUpdateApplication()}
          />
        </div>
      </div>
      {/* <AdvanceFilter
        ref={advanceFilterRef}
        isOpenAdvanceFilter={isOpenAdvanceFilter}
        setIsOpenAdvanceFilter={setIsOpenAdvanceFilter}
        experiences={experiences}
        setExperiences={setExperiences}
        educations={educations}
        setEducations={setEducations}
      /> */}
      <Tabs
        variant="soft-rounded"
        colorScheme="blue"
        className="mt-4"
        onChange={handleTabChange}
      >
        <TabList mb="1em">
          {ApplicationStatuses.map((value) => (
            <Tab>
              {value}
              {/* <div className="ml-2 bg-gray-200 rounded-full w-7 h-7 flex items-center justify-center"> */}
              {/* {applicationCounts[value] ?? 0} */}
              {/* </div> */}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {ApplicationStatuses.map(() => (
            <TabPanel>
              <Applications
                applications={applications}
                onStatusChange={handleStatusChange}
              />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
      <Pagination curPage={curPage} setCurPage={setCurPage} size={size} />
    </>
  );
}
