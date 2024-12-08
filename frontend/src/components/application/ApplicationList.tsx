import { useEffect, useRef, useState } from "react";
import { AdvanceFilter, Pagination, usePagination } from "../global";
import { FindApplicationsAPI, UpdateApplicationAPI } from "../../apis";
import { useParams } from "react-router-dom";
import { Heading5 } from "../headings";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import Applications from "./Applications";
import { ApplicationStatuses } from "../../helpers/constants";
import { ButtonSolid } from "../buttons";
import { TfiEmail } from "react-icons/tfi";
import { useSearchInput_3 } from "../inputs";
import { useDispatch, useSelector } from "react-redux";
import { openFormSendEmail } from "../../features";
import { toastError, toastSuccess } from "../toast";

export default function ApplicationList() {
  const dispatch = useDispatch();
  const { jobId } = useParams();
  const [applications, setApplications] = useState<Array<any>>([]);
  const [tabStatus, setTabStatus] = useState<string | undefined>("Submitted");
  const [checkUpdate, setCheckUpdate] = useState<number>(1);
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
      status: tabStatus,
      page: curPage,
    });
    if (data.isSuccess) {
      setApplications(data.metadata.applications);
      setSize(data.metadata.meta.size);
    }
  }
  console.log("checkUpdate", checkUpdate);
  useEffect(() => {
    findApplications();
  }, [tabStatus, checkUpdate]);

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
    setTabStatus(ApplicationStatuses[index]);
  };

  const handleUpdateStatus = async (id: string, value: string) => {
    console.log("handleUpdateStatus called", id, value);
    const data = await UpdateApplicationAPI(id, { status: value });
    console.log("checkdata", data);
    if (data.isSuccess) {
      toastSuccess(data.message);
      setCheckUpdate((prev) => prev + 1);
    } else {
      toastError(data.message);
    }
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
          {/* <IconButton
            icon={<MdOutlineSaveAs size={22} color="white" />}
            bg={"var(--primary-500)"}
            aria-label="Save changes"
            onClick={() => handleUpdateApplication()}
          /> */}
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
              {/* <div className="ml-2 bg-gray-200 rounded-full w-7 h-7 flex items-center justify-center">
              {applicationCounts[value] ?? 0}
              </div> */}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {ApplicationStatuses.map(() => (
            <TabPanel>
              <Applications
                applications={applications}
                onStatusChange={handleUpdateStatus}
              />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
      <Pagination curPage={curPage} setCurPage={setCurPage} size={size} />
    </>
  );
}
