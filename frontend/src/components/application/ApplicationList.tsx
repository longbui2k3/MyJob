import { useEffect, useRef, useState } from "react";
import { BreadcrumbHeader, Pagination, usePagination } from "../global";
import { FindApplicationsAPI, UpdateApplicationAPI } from "../../apis";
import { useParams } from "react-router-dom";
import { Heading5 } from "../headings";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import Applications from "./Applications";
import {
  ApplicationStatuses,
  DASHBOARD_APPLICATIONS_KEY,
  getBreadcrumb,
} from "../../helpers/constants";
import { ButtonSolid } from "../buttons";
import { TfiEmail } from "react-icons/tfi";
import { useDispatch } from "react-redux";
import { openFormSendEmail, setData, setId } from "../../features";
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
  const [listEmail, setListEmail] = useState<Array<string>>([]);

  async function findApplications() {
    const data = await FindApplicationsAPI({
      job: jobId,
      status: tabStatus,
      page: curPage,
    });
    if (data.isSuccess) {
      setApplications(data.metadata.applications);
      setSize(data.metadata.meta.size);

      const emails = data.metadata.applications
        .map((app: any) => app.profile?.email)
        .filter((email: string | undefined) => email);
      setListEmail(emails);
    }
  }

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
  }, [checkUpdate]);

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
      <BreadcrumbHeader
        breadcrumbRoutes={getBreadcrumb(DASHBOARD_APPLICATIONS_KEY)}
        isDashboard={true}
      />
      <div className="flex items-center justify-between">
        <Heading5 name="Job Applications" />
        <div className="flex space-x-2">
          <ButtonSolid
            className="my-auto"
            onClick={() => {
              dispatch(openFormSendEmail());
              dispatch(setId(jobId));
              dispatch(setData(listEmail));
            }}
            children={"Send Email"}
            leftIcon={<TfiEmail size={20} />}
            height="40px"
            width="150px"
          />
        </div>
      </div>
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
              <div className="ml-2 bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center">
                {applicationCounts[value] ?? 0}
              </div>
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
